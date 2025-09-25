import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Reputation & Sentiment Radar API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "super_secret_key_for_testing" # Change this in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()