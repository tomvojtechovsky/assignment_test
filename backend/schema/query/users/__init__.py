import strawberry

from backend.schema.query.users.resolver import get_users


@strawberry.type
class UserQueries:
    get_users = strawberry.field(resolver=get_users)
