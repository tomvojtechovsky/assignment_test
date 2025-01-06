# backend/schema/query/__init__.py
import strawberry
from typing import Optional, List
import logging
from .users import UserQueries
from .messages import MessagesQueries
from .messages.activity_resolver import get_activity_data
from .messages.metrics_resolver import get_messages_metrics
from .messages.metrics_types import ActivityDataPoint
from .auth import AuthQueries  # Import nového resolveru pro autentifikaci

@strawberry.type
class Query:
    """Hlavní Query schéma, které kombinuje všechny queries"""
    
    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())  # Dotaz pro uživatele
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())  # Dotaz pro zprávy
    metrics = strawberry.field(resolver=get_messages_metrics)  # Dotaz pro metriky
    auth: AuthQueries = strawberry.field(resolver=lambda: AuthQueries())  # Dotaz pro autentifikaci

    @strawberry.field
    async def activityData(
        self,
        period: str,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        type: Optional[str] = None
    ) -> List[ActivityDataPoint]:
        """Dotaz pro získání aktivit na základě period a dalších filtrů."""
        logger = logging.getLogger('strawberry.query')
        logger.setLevel(logging.DEBUG)
        
        logger.info(f"GraphQL activity data query: period={period}, type={type}")
    
        return await get_activity_data(period, startDate, endDate, type)
