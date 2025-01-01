from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from strawberry.fastapi import BaseContext
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType

from backend.db.data_messages import DataflowData, Record, SyslogData
from backend.db.users import User
from backend.services.authorization_service import AuthorizationService
from backend.settings import db_settings


class Context(BaseContext):
    """Context class that stores authorization service."""

    def __init__(self):
        super().__init__()
        self.auth_service: AuthorizationService = AuthorizationService()


Info = _Info[Context, RootValueType]


def get_context() -> Context:
    return Context()


async def init_models():
    """Initialize DB models needed for MongoDB."""

    client = AsyncIOMotorClient(
        f"mongodb://{db_settings.mongodb_user}:{db_settings.mongodb_pass}"
        f"@{db_settings.mongodb_host}:{db_settings.mongodb_port}"
    )
    database = client[db_settings.mongodb_database]

    await init_beanie(database=database, document_models=[DataflowData, Record, SyslogData, User])
