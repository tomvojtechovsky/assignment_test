# backend/schema/query/__init__.py
import strawberry
from typing import Optional, List
import logging
import sys
from .users import UserQueries
from .messages import MessagesQueries
from .messages.activity_resolver import get_activity_data
from .messages.metrics_resolver import get_messages_metrics
from .messages.metrics_types import ActivityDataPoint

@strawberry.type
class Query:
    """Hlavní Query schéma, které kombinuje všechny queries"""
    
    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())
    metrics = strawberry.field(resolver=get_messages_metrics)

    @strawberry.field
    async def activityData(
        self,
        period: str,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        type: Optional[str] = None
    ) -> List[ActivityDataPoint]:
        # Přidejte explicitní logging
        logger = logging.getLogger('strawberry.query')
        logger.setLevel(logging.DEBUG)
        
        # Standardní logging
        logger.info(f"GraphQL activity data query: period={period}, type={type}")
    
        return await get_activity_data(period, startDate, endDate, type)