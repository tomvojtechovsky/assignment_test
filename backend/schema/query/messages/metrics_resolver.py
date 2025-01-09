from typing import List, Optional
from datetime import datetime, timedelta
from backend.db.data_messages import Record
from backend.filters.base import BaseFilter
from .metrics_types import MessagesMetricsResponse, AttackTypeCount

async def get_messages_metrics(
    type: Optional[str] = None,
    startDate: Optional[str] = None,
    endDate: Optional[str] = None,
    threat: Optional[bool] = None
) -> MessagesMetricsResponse:
    # Základní query
    query = Record.find({}, with_children=True)

    # Aplikace filtrů
    query = BaseFilter.apply(query, 'type', type)
    query = BaseFilter.apply(query, 'threat', threat)

    # Filtr podle datového rozsahu
    if startDate and endDate:
        query = query.find({
            'timestamp': {
                '$gte': datetime.fromisoformat(startDate.replace('Z', '')),
                '$lte': datetime.fromisoformat(endDate.replace('Z', ''))
            }
        })
    elif startDate:
        query = query.find({
            'timestamp': {
                '$gte': datetime.fromisoformat(startDate.replace('Z', ''))
            }
        })
    elif endDate:
        query = query.find({
            'timestamp': {
                '$lte': datetime.fromisoformat(endDate.replace('Z', ''))
            }
        })

    # Získáme všechny záznamy pro výpočet metrik
    records = await query.to_list()
    total_count = len(records)

    # Počty podle typů
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