import strawberry
from typing import Optional, List
import logging
from .users import UserQueries
from .messages import MessagesQueries
from .messages.activity_resolver import get_activity_data
from .messages.metrics_resolver import get_messages_metrics
from .messages.metrics_types import ActivityDataPoint
from .auth import AuthQueries

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.debug("Query module loaded")

@strawberry.type
class Query:
    def __init__(self):
        logger.debug("Query class initialized")

    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())
    metrics = strawberry.field(resolver=get_messages_metrics)
    auth: AuthQueries = strawberry.field(resolver=lambda: AuthQueries())

    @strawberry.field
    async def activityData(
        self,
        period: str,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        type: Optional[str] = None,
        threat: Optional[bool] = None
    ) -> List[ActivityDataPoint]:
        logger.debug(f"activityData method called with: period={period}, startDate={startDate}, endDate={endDate}, type={type}, threat={threat}")
        result = await get_activity_data(period, startDate, endDate, type, threat)
        logger.debug(f"activityData result: {result}")
        return result

logger.debug("Query module loaded")

__all__ = ["Query"]