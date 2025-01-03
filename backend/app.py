import asyncio
import datetime
import random
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.db.data_messages import DataflowData, Record, SyslogData
from backend.db.users import User
from backend.router import router
from backend.utils import init_models

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

def _random_ip() -> str:
    return ".".join([str(random.randint(1, 255)) for _ in range(4)])


def _generate_syslog_message() -> SyslogData:
    threat = random.random() > 0.5
    if threat:
        attack_type = random.choice(ATTACK_TYPES)
    else:
        attack_type = "benign"

    return SyslogData(
        probe_name="probe-1",
        probe_ip=_random_ip(),
        content=random.choice(SYSLOG_TEXT),
        timestamp=datetime.datetime.now(),
        threat=threat,
        attack_type=attack_type,
    )


def _generate_dataflow_message() -> DataflowData:
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
        timestamp=timestamp,
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
    app = FastAPI(title="Web Developer Challenge", lifespan=lifespan)

    app.include_router(router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost", "http://localhost:5173", "http://127.0.0.1", "http://127.0.0.1:5173"],
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["*"],
    )

    return app
