import logging
from datetime import datetime, timedelta, timezone
import jwt
from fastapi import Response
from backend.utils import Info
from backend.db.users import User
from backend.settings import settings

# Nastavení loggeru
logger = logging.getLogger('mutations.auth')
logger = logging.getLogger('strawberry.query')
logger.setLevel(logging.DEBUG)

logger.info(f"backend\schema\mutations\auth\resolver.py")


async def login(info: Info, username: str, password: str) -> str:
    """
    Implementace přihlášení uživatele pomocí JWT tokenu
    Args:
        info: Kontext požadavku obsahující auth_service a response objekt
        username: Přihlašovací jméno
        password: Heslo uživatele
    Returns:
        str: JWT token při úspěšném přihlášení nebo chybová zpráva
    """
    # Logování přijatých parametrů
    logger.debug(f"Attempting to log in with username: {username} and password: {password}")

    # Přidejte na začátek login funkce
    logger.debug(f"Context info: {info.context}")
    logger.debug(f"Context response: {getattr(info.context, 'response', None)}")

    # Vyhledání uživatele v databázi podle username
    user = await User.find_one(User.username == username)
    if not user:
        logger.warning(f"Invalid credentials: User {username} not found.")
        return "Invalid credentials"

    # Ověření hesla pomocí auth_service
    if not info.context.auth_service.verify_password(password, user.password):
        logger.warning(f"Invalid credentials: Incorrect password for {username}.")
        return "Invalid credentials"

    # Vytvoření JWT tokenu s exspirací
    token_data = {
        "sub": username,  # subject = identifikace uživatele
        "exp": datetime.now(timezone.utc) + timedelta(days=settings.JWT_EXPIRATION_DAYS)
    }
    # Zakódování tokenu pomocí tajného klíče
    token = jwt.encode(token_data, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    # Logování úspěšného přihlášení
    logger.info(f"User {username} logged in successfully. Token created.")

    # Nastavení bezpečné cookie s tokenem
    response = info.context.response
    response.set_cookie(
        key="auth_token", 
        value=token,
        httponly=True,  # cookie není dostupná z JavaScriptu
        max_age=86400,  # platnost cookie 24 hodin
        samesite="lax"  # ochrana proti CSRF
    )

    return token

async def logout(info: Info) -> bool:
    """Odhlášení uživatele - smazání JWT tokenu"""
    response = info.context.response
    if response:
        response.delete_cookie(
            key="auth_token",
            httponly=True,
            samesite="lax"
        )
    return True