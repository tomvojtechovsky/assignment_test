# backend/app.py

# ===== Standardní knihovny =====
import strawberry
import asyncio
import datetime
import random
import logging
from contextlib import asynccontextmanager
from typing import Any

# ===== Framework importy =====
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter, BaseContext

# ===== Lokální importy =====
from backend.db.data_messages import DataflowData, Record, SyslogData
from backend.db.users import User
from backend.middleware.auth import auth_middleware
from backend.schema.middleware import AuthMiddleware
from backend.schema.mutations import Mutation
from backend.schema.query import Query
from backend.services.authorization_service import AuthorizationService
from backend.utils import init_models

# ===== Nastavení loggeru =====
logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format='%(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('debug.log', encoding='utf-8')
    ]
)

# Nastavení úrovně logování pro jednotlivé moduly
logging.getLogger('backend').setLevel(logging.INFO)
logging.getLogger('strawberry').setLevel(logging.INFO)

# ===== GraphQL konfigurace =====
class GraphQLContext(BaseContext):
    """Třída pro správu kontextu GraphQL požadavků"""
    def __init__(self, request: Request, auth_service: AuthorizationService):
        super().__init__()
        self.request = request
        self.auth_service = auth_service
        self.response = None

async def get_context(request: Request) -> GraphQLContext:
    """Vytvoření kontextu pro GraphQL požadavky"""
    return GraphQLContext(request=request, auth_service=auth_service)

# Inicializace služeb
auth_service = AuthorizationService()

# Vytvoření GraphQL schématu
schema = strawberry.Schema(query=Query, mutation=Mutation)

# ===== Konstanty pro generování dat =====
class DataGenerationConfig:
    """Konstanty pro generování testovacích dat"""
    SYSLOG_MESSAGES = [
        "generating core.3956",
        "generating core.2150",
        "data TLB error interrupt",
        "ciod: Error loading /bgl/apps/scaletest/performance/MINIBEN/mb_243_0810/allreduce.rts: invalid or missing program image, Exec format error",
        "45163734 double-hummer alignment exceptions",
        "generating core.12139",
        "ciod: Error reading message prefix after VERSION_MESSAGE on CioStream socket to 172.16.96.116:56258: Link has been severed",
    ]
    
    ATTACK_TYPES = [
        "botnet", "ddos", "malware", "scanning",
        "worm", "hijacking", "MITM"
    ]

    START_DATE = datetime.datetime(2024, 1, 1)
    END_DATE = datetime.datetime.now()

# ===== Pomocné funkce pro generování dat =====
class DataGenerator:
    """Třída pro generování testovacích dat"""
    @staticmethod
    def random_ip() -> str:
        """Generování náhodné IP adresy"""
        return ".".join([str(random.randint(1, 255)) for _ in range(4)])

    @staticmethod
    def random_date(start: datetime.datetime, end: datetime.datetime) -> datetime.datetime:
        """Generování náhodného data s váženou pravděpodobností pro víkendy a prázdniny"""
        def get_weight(date):
            if date.weekday() >= 5:  # Víkend
                return 3
            elif date.month in [6, 7, 8, 12]:  # Prázdniny
                return 2
            return 1

        while True:
            seconds = random.randint(0, int((end - start).total_seconds()))
            date = start + datetime.timedelta(seconds=seconds)
            if random.choices([True, False], [get_weight(date), 1])[0]:
                return date

    @classmethod
    def generate_syslog(cls) -> SyslogData:
        """Generování testovací syslog zprávy"""
        threat = random.random() > 0.5
        return SyslogData(
            probe_name="probe-1",
            probe_ip=cls.random_ip(),
            content=random.choice(DataGenerationConfig.SYSLOG_MESSAGES),
            timestamp=cls.random_date(DataGenerationConfig.START_DATE, DataGenerationConfig.END_DATE),
            threat=threat,
            attack_type=random.choice(DataGenerationConfig.ATTACK_TYPES) if threat else "benign"
        )

    @classmethod
    def generate_dataflow(cls) -> DataflowData:
        """Generování testovací dataflow zprávy"""
        threat = random.random() > 0.5
        timestamp = cls.random_date(DataGenerationConfig.START_DATE, DataGenerationConfig.END_DATE)
        source_ip = cls.random_ip()
        target_ip = cls.random_ip()
        
        return DataflowData(
            probe_name="probe-1",
            probe_ip=cls.random_ip(),
            timestamp=timestamp,
            threat=threat,
            source_ip=source_ip,
            source_port=random.randint(1000, 60000),
            target_ip=target_ip,
            target_port=random.randint(1000, 60000),
            attack_type=random.choice(DataGenerationConfig.ATTACK_TYPES) if threat else "benign",
            content=f"Dataflow message from {source_ip} to {target_ip}"
        )

# ===== Database operace =====
class DatabaseOperations:
    """Třída pro práci s databází"""
    @staticmethod
    async def generate_message():
        """Generování a uložení náhodné zprávy do databáze"""
        generator = random.choice([
            DataGenerator.generate_syslog,
            DataGenerator.generate_dataflow
        ])
        message: Record = generator()
        await message.insert()

    @staticmethod
    async def initialize_database():
        """Inicializace databáze testovacími daty"""
        await Record.find_all(with_children=True).delete()
        await User.delete_all()
        
        # Vytvoření admin uživatele
        await User(
            username="admin",
            password="$Sf3zOdAxTLlRLjMg72ldVPgk4iLFrCgabFM3HHhp3To=$O8Y3p5HQdDDYLW2z/j8S9tuKPOZxr2vVqm9MV1GHY8Smyj1UDFVuIr4G/7Roq/1NPYOhxkmGw5ozxpWTVQcLPQ==",
        ).insert()

        # Generování testovacích zpráv
        tasks = [asyncio.create_task(DatabaseOperations.generate_message()) 
                for _ in range(1000)]
        await asyncio.gather(*tasks)

# ===== Lifecycle management =====
@asynccontextmanager
async def lifespan(_: FastAPI):
    """Správa životního cyklu aplikace"""
    await init_models()
    await DatabaseOperations.initialize_database()
    yield
    await Record.find_all(with_children=True).delete()
    await User.delete_all()

# ===== Application Factory =====
def get_app() -> FastAPI:
    """Vytvoření a konfigurace FastAPI aplikace"""
    logger.info("Spouštění FastAPI aplikace...")
    
    app = FastAPI(
        title="Web Developer Challenge",
        lifespan=lifespan
    )

    # Konfigurace CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost",
            "http://localhost:5173",
            "http://127.0.0.1",
            "http://127.0.0.1:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5174"
        ],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    # Přidání auth middleware
    app.middleware("http")(auth_middleware)
    
    # Konfigurace GraphQL
    app.include_router(
        GraphQLRouter(
            schema=schema,
            context_getter=get_context
        ),
        prefix="/graphql"
    )

    logger.info("FastAPI aplikace úspěšně spuštěna")
    return app