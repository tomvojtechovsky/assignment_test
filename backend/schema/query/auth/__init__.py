# backend/schema/query/auth/__init__.py
import strawberry
import jwt
import logging
from backend.settings import settings
from backend.utils import Info
from backend.schema.query.auth.resolver import check_auth

@strawberry.type
class AuthQueries:
    """Resolver pro autentifikaci"""
    @strawberry.field
    async def check_auth(self, info: Info) -> bool:
        # Ověření platnosti JWT tokenu
        token = info.context.request.cookies.get("auth_token")
        if not token:
            return False
        try:
            jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            return True
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False

