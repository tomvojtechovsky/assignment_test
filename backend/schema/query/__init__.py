import strawberry
from .users import UserQueries
from .messages import MessagesQueries

@strawberry.type
class Query:
    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())