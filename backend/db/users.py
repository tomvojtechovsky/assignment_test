from beanie import Document, Indexed


class User(Document):
    """Class for user with access to web interface."""

    username: Indexed(str, unique=True)
    password: str

    class Settings:
        """Internal settings for MongoDB."""

        name = "web_users"
        validate_on_save = True
