#backend\schema\query\messages\types.py
import strawberry
from datetime import datetime
from typing import List, Union

@strawberry.type
class BaseMessage:
    timestamp: datetime
    probeIp: str = strawberry.field(description="IP adresa sondy")
    probeName: str = strawberry.field(description="Název sondy")
    content: str
    threat: bool
    type: str
    attackType: str = strawberry.field(description="Typ útoku")

@strawberry.type
class DataflowMessage(BaseMessage):
    sourceIp: str = strawberry.field(description="Zdrojová IP adresa")
    sourcePort: int = strawberry.field(description="Zdrojový port")
    targetIp: str = strawberry.field(description="Cílová IP adresa")
    targetPort: int = strawberry.field(description="Cílový port")

@strawberry.type
class SyslogMessage(BaseMessage):
    pass

@strawberry.type
class MessagesResponse:
    items: List[Union[SyslogMessage, DataflowMessage]]
    totalCount: int = strawberry.field(description="Celkový počet záznamů")
    hasMore: bool = strawberry.field(description="Indikátor dalších stránek")

@strawberry.type
class MessagesMetricsResponse:
    """Response objekt pro metriky zpráv"""
    totalCount: int
    syslogCount: int
    dataflowCount: int
    threatsCount: int
    attacksByType: dict[str, int]
    last24hCount: int