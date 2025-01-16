# backend\schema\query\__init__.py
import strawberry
from typing import Optional, List
import logging
from .users import UserQueries
from .messages import MessagesQueries

from .messages.metrics_resolver import compute_metrics
from .messages.metrics_types import MessagesMetricsResponse

from .messages.activity_resolver import get_activity_data
from .messages.activity_types import ActivityDataPoint

from .messages.attack_type_distribution_resolver import get_attack_types_distribution  # Nový import
from .messages.attack_types import AttackTypeDistribution  # Nový import

from .auth import AuthQueries

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@strawberry.type
class Query:
    auth: AuthQueries = strawberry.field(resolver=lambda: AuthQueries())

    users: UserQueries = strawberry.field(resolver=lambda: UserQueries())

    # Zprávy
    messages: MessagesQueries = strawberry.field(resolver=lambda: MessagesQueries())

    # Metriky zpráv
    @strawberry.field
    async def metrics(
        self,
        type: Optional[str] = None,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        threat: Optional[bool] = None
    ) -> MessagesMetricsResponse:
        result = await compute_metrics(type, startDate, endDate, threat)
        return result  # Přímo vracíme MessagesMetricsResponse

    # Časová aktivita
    @strawberry.field
    async def activityData(
        self,
        period: str,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        type: Optional[str] = None,
        threat: Optional[bool] = None
    ) -> List[ActivityDataPoint]:
        result = await get_activity_data(period, startDate, endDate, type, threat)
        return result

    # Distribuce útoků podle typu (syslog, dataflow, all)
    @strawberry.field
    async def attackTypeDistribution(
        self,
        startDate: Optional[str] = None,
        endDate: Optional[str] = None,
        type: Optional[str] = None,
        threat: Optional[bool] = None
    ) -> List[AttackTypeDistribution]:
        result = await get_attack_types_distribution(type, startDate, endDate, threat)
        return result


__all__ = ["Query"]