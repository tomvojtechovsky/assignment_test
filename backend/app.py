# backend\app.py
import asyncio
import datetime
import random
import logging

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.data_messages import DataflowData, Record, SyslogData
from backend.db.users import User
from backend.router import router
from backend.utils import init_models

# Nastavení logování
# Nastavte root logger
logging.basicConfig(
    level=logging.INFO,  # Změňte na DEBUG pro více informací
    format='%(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),  # Výstup do konzole
        logging.FileHandler('debug.log', encoding='utf-8')  # Log do souboru
    ]
)
logger = logging.getLogger(__name__)

logging.getLogger('backend').setLevel(logging.INFO)
logging.getLogger('strawberry').setLevel(logging.INFO)

SYSLOG_TEXT = [
    "generating core.3956",
    "generating core.2150",
    "data TLB error interrupt",
    "ciod: Error loading /bgl/apps/scaletest/performance/MINIBEN/mb_243_0810/allreduce.rts: invalid or missing program"
    " image, Exec format error",
    "45163734 double-hummer alignment exceptions",
    "generating core.12139",
    "ciod: Error reading message prefix after VERSION_MESSAGE on CioStream socket to"
    " 172.16.96.116:56258: Link has been severed",
]

ATTACK_TYPES = [
    "botnet",
    "ddos",
    "malware",
    "scanning",
    "worm",
    "hijacking",
    "MITM",
]

# Helper functions for generating random data
def _random_ip() -> str:
    return ".".join([str(random.randint(1, 255)) for _ in range(4)])

def _random_date(start, end):
    total_seconds = int((end - start).total_seconds())
    
    # Define weights for different periods
    def get_weight(date):
        if date.weekday() >= 5:  # Weekend
            return 3
        elif date.month in [6, 7, 8, 12]:  # Summer and Winter holidays
            return 2
        else:
            return 1

    while True:
        random_seconds = random.randint(0, total_seconds)
        random_date = start + datetime.timedelta(seconds=random_seconds)
        if random.choices([True, False], [get_weight(random_date), 1])[0]:
            return random_date

def _generate_syslog_message() -> SyslogData:
    threat = random.random() > 0.5
    if threat:
        attack_type = random.choice(ATTACK_TYPES)
    else:
        attack_type = "benign"

    start_date = datetime.datetime(2024, 1, 1)
    end_date = datetime.datetime.now()
    random_timestamp = _random_date(start_date, end_date)

    return SyslogData(
        probe_name="probe-1",
        probe_ip=_random_ip(),
        content=random.choice(SYSLOG_TEXT),
        timestamp=random_timestamp,
        threat=threat,
        attack_type=attack_type,
    )


def _generate_dataflow_message() -> DataflowData:

    start_date = datetime.datetime(2024, 1, 1)
    end_date = datetime.datetime.now()
    random_timestamp = _random_date(start_date, end_date)

    probe_name = "probe-1"
    probe_ip = _random_ip()
    timestamp = datetime.datetime.now()
    threat = random.random() > 0.5
    source_ip = _random_ip()
    source_port = random.randint(1000, 60000)
    target_ip = _random_ip()
    target_port = random.randint(1000, 60000)
    if threat:
        attack_type = random.choice(ATTACK_TYPES)
    else:
        attack_type = "benign"
    return DataflowData(
        probe_name=probe_name,
        probe_ip=probe_ip,
        content=f"{timestamp=}, {probe_name=}, {probe_ip=}, {threat=}, "
        f"{source_ip=}, {source_port=}, {target_ip=}, {target_port=}",
        timestamp=random_timestamp,
        threat=threat,
        source_ip=source_ip,
        source_port=source_port,
        target_ip=target_ip,
        target_port=target_port,
        attack_type=attack_type,
    )


async def generate_message():
    gen = random.choice([_generate_syslog_message, _generate_dataflow_message])
    message: Record = gen()
    await message.insert()


async def drop_db():
    await Record.find_all(with_children=True).delete()
    await User.delete_all()


async def init_db():
    await drop_db()
    # password: admin
    await User(
        username="admin",
        password="$Sf3zOdAxTLlRLjMg72ldVPgk4iLFrCgabFM3HHhp3To=$O8Y3p5HQdDDYLW2z"
        "/j8S9tuKPOZxr2vVqm9MV1GHY8Smyj1UDFVuIr4G/7Roq/1NPYOhxkmGw5ozxpWTVQcLPQ==",
    ).insert()
    tasks = []
    for _ in range(1000):
        tasks.append(asyncio.create_task(generate_message()))
    await asyncio.gather(*tasks)


@asynccontextmanager
async def lifespan(_: FastAPI):
    await init_models()
    await init_db()
    yield
    await drop_db()


def get_app() -> FastAPI:
    logger.info("Starting FastAPI application...")
    app = FastAPI(title="Web Developer Challenge", lifespan=lifespan)

    app.include_router(router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost", "http://localhost:5173", "http://127.0.0.1", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )
    
    logger.info("FastAPI application started successfully.")
    return app
