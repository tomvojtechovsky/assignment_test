import strawberry

from backend.db.users import User
from backend.utils import Info


@strawberry.type
class UserInfo:
    username: str


async def get_users(info: Info) -> list[UserInfo]:
    """List all users."""
    # info context data are accessible via info.context.auth_service for authorization service for example.
    users = await User.all().to_list()
    return [UserInfo(username=user.username) for user in users]
