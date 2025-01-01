import strawberry

from backend.schema.query.users import UserQueries


@strawberry.type
class Query:
    users: UserQueries = strawberry.field(resolver=UserQueries)
