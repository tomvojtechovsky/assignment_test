import base64

from cryptography.exceptions import InvalidKey
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from backend.db.users import User


class AuthorizationService:

    async def login(self, username: str, password: str) -> User:
        """
        Validate username and password.

        :return: User if username and password are valid, else exception is raised.
        :raises: ValueError if username or password is incorrect.
        """
        user = await User.find_one(User.username == username.strip())

        exc = ValueError("Invalid username or password")

        if not user:
            raise exc

        delimiter = user.password[0]
        _, salt, hashed_password = user.password.split(delimiter)

        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA512(),
            length=64,
            salt=base64.b64decode(salt),
            iterations=25000,
        )

        try:
            kdf.verify(password.encode(), base64.b64decode(hashed_password))
        except InvalidKey as e:
            raise exc from e

        return user

    def verify_password(self, password: str, stored_password: str) -> bool:
        """
        Ověří heslo proti uloženému hash
        """
        try:
            delimiter = stored_password[0]
            _, salt, hashed_password = stored_password.split(delimiter)

            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA512(),
                length=64,
                salt=base64.b64decode(salt),
                iterations=25000,
            )

            kdf.verify(password.encode(), base64.b64decode(hashed_password))
            return True
        except (InvalidKey, ValueError):
            return False