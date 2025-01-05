import strawberry
from typing import List
from datetime import datetime, timedelta

@strawberry.type
class AttackTypeCount:
    attack_type: str
    count: int

@strawberry.type
class MessagesMetricsResponse:
    """Response objekt pro metriky zpráv"""
    totalCount: int = strawberry.field(description="Celkový počet záznamů")
    syslogCount: int = strawberry.field(description="Počet syslog zpráv")
    dataflowCount: int = strawberry.field(description="Počet dataflow zpráv")
    threatsCount: int = strawberry.field(description="Počet hrozeb")
    attacksByType: List[AttackTypeCount] = strawberry.field(description="Počet útoků podle typu")
    last24hCount: int = strawberry.field(description="Počet zpráv za posledních 24 hodin")