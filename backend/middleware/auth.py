# backend/middleware/auth.py
from fastapi import Request
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from backend.settings import settings

async def auth_middleware(request: Request, call_next):
    try:
        token = request.cookies.get("auth_token")
        if token:
            try:
                decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
                request.state.authenticated = True
            except (ExpiredSignatureError, InvalidTokenError):
                request.state.authenticated = False
        else:
            request.state.authenticated = False
    except Exception:
        request.state.authenticated = False

    response = await call_next(request)
    return response
