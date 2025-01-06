#backend\schema\query\auth\resolver.py
import jwt
import logging
from backend.settings import settings
from backend.utils import Info

# Nastavení loggeru
logger = logging.getLogger('auth')
logger.setLevel(logging.DEBUG)

async def check_auth(info: Info) -> bool:
    """Ověří, zda je uživatel přihlášen podle JWT tokenu v cookie."""
    token = info.context.request.cookies.get("auth_token")

    # Pokud není token, uživatel není přihlášen
    if not token:
        logger.debug("No auth token found in cookies.")
        return False

    try:
        # Dekódujeme token a zkontrolujeme jeho platnost
        decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        logger.debug(f"Token is valid. Decoded token: {decoded_token}")
        return True
    except jwt.ExpiredSignatureError:
        # Token vypršel
        logger.warning("Auth token expired.")
        return False
    except jwt.InvalidTokenError:
        # Neplatný token
        logger.error("Invalid auth token.")
        return False
    except Exception as e:
        # Ošetření dalších výjimek
        logger.error(f"An error occurred while validating the auth token: {e}")
        return False

