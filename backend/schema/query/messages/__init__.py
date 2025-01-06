#backend\schema\query\messages\__init__.py
import strawberry
from typing import Optional
from .resolver import get_messages
from .types import MessagesResponse

@strawberry.type
class MessagesQueries:
   @strawberry.field
   async def messages(
       self,
       limit: int = 50,
       offset: int = 0,
       type: str | None = None,
       startDate: str | None = None,  # Zachovat startDate
       endDate: str | None = None     # Zachovat endDate
   ) -> MessagesResponse:
       return await get_messages(
           limit=limit, 
           offset=offset, 
           type=type, 
           startDate=startDate, 
           endDate=endDate
       )