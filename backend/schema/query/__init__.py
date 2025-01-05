import strawberry
from .users import UserQueries
from .messages import MessagesQueries
from .messages.activity_resolver import get_activity_data
from .messages.metrics_resolver import get_messages_metrics

@strawberry.type
class Query:
    """Hlavní Query schéma, které kombinuje všechny queries"""
    
    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())
    metrics = strawberry.field(resolver=get_messages_metrics)
    activityData = strawberry.field(resolver=get_activity_data)