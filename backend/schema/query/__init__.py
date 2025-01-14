# backend\schema\query\__init__.py
import strawberry
from typing import Optional, List
import logging
from .users import UserQueries
from .messages import MessagesQueries

from .messages.metrics_resolver import get_messages_metrics

from .messages.activity_resolver import get_activity_data
from .messages.activity_types import ActivityDataPoint

from .messages.attack_type_distribution_resolver import get_attack_types_distribution  # Nový import
from .messages.attack_types import AttackTypeDistribution  # Nový import

from .auth import AuthQueries

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

@strawberry.type
class Query:

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
    #    logger.debug(f"activityData method called with: period={period}, startDate={startDate}, endDate={endDate}, type={type}, threat={threat}")
       result = await get_activity_data(period, startDate, endDate, type, threat)
       return result

   @strawberry.field
   async def attackTypeDistribution(
       self,
       startDate: Optional[str] = None,
       endDate: Optional[str] = None,
       type: Optional[str] = None,
       threat: Optional[bool] = None
   ) -> List[AttackTypeDistribution]:
    #    logger.debug(f"attackTypeDistribution method called with: startDate={startDate}, endDate={endDate}, type={type}, threat={threat}")
       result = await get_attack_types_distribution(type, startDate, endDate, threat)
       return result


__all__ = ["Query"]