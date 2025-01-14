from typing import List, Optional
import logging
from datetime import datetime, timedelta
from backend.db.data_messages import Record
from backend.filters.base import BaseFilter
from .metrics_types import MessagesMetricsResponse, AttackTypeCount

logger = logging.getLogger('strawberry.query')
logger.setLevel(logging.DEBUG)

logger = logging.getLogger(__name__)

async def get_messages_metrics(
   type: Optional[str] = None,
   startDate: Optional[str] = None,
   endDate: Optional[str] = None,
   threat: Optional[bool] = None
) -> MessagesMetricsResponse:
    
    logger.debug(f"get_messages_metrics: type={type}, threat={threat}") 

    # Základní query
    query = Record.find({}, with_children=True)

    #Filry
    # Aplikace filtru pro typ zprávy
    query = BaseFilter.apply(query, 'type', type)

    # Aplikace filtru pro hrozbu
    # print( "metrics_resolver.py: threat: ", threat)
    query = BaseFilter.apply(query, 'threat', threat)

    # Aplikace časového filtru pomocí nové metody
    query = BaseFilter.apply_date_range(query, startDate, endDate)


    # Získání a zpracování dat
    records = await query.to_list()
    total_count = len(records)

    # Počty podle typů zpráv
    syslog_count = len([r for r in records if r.type == "syslog"])
    dataflow_count = len([r for r in records if r.type == "dataflow"])

    # Počty hrozeb
    threats_count = len([r for r in records if r.threat])

    # Výpočet útoků podle typu
    attacks_by_type = []
    attack_counts = {}
    for record in records:
        attack_counts[record.attack_type] = attack_counts.get(record.attack_type, 0) + 1

    # Výpočet záznamů za posledních 24 hodin
    last_24h_count = len([r for r in records if r.timestamp >= datetime.now() - timedelta(days=1)])

    for attack_type, count in attack_counts.items():
        attacks_by_type.append(AttackTypeCount(attack_type=attack_type, count=count))

    return MessagesMetricsResponse(
        totalCount=total_count,
        syslogCount=syslog_count,
        dataflowCount=dataflow_count,
        threatsCount=threats_count,
        attacksByType=attacks_by_type,
        last24hCount=last_24h_count
   )