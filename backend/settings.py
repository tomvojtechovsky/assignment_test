from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # MongoDB konfigurace
    mongodb_host: str = Field(default="localhost")
    mongodb_port: int = Field(default=27017)
    mongodb_user: str = Field(default="assignment")
    mongodb_pass: str = Field(default="assignment")
    mongodb_database: str = Field(default="assignment")

    # JWT konfigurace
    SECRET_KEY: str = Field(default="rqnRXBk8saBx5h_lEuA_lRr1zSI7b3EW9u-jVQqZpAQ")
    JWT_ALGORITHM: str = Field(default="HS256")
    JWT_EXPIRATION_DAYS: int = Field(default=1)

    class Config:
        env_file = ".env"

settings = Settings()
db_settings = settings  # pro zpětnou kompatibilitu