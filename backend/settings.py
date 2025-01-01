from pydantic import Field
from pydantic_settings import BaseSettings


class DatabaseSettings(BaseSettings):
    mongodb_host: str = Field(default="localhost")
    mongodb_port: int = Field(default=27017)
    mongodb_user: str = Field(default="assignment")
    mongodb_pass: str = Field(default="assignment")
    mongodb_database: str = Field(default="assignment")


db_settings = DatabaseSettings()
