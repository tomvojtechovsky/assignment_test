from typing import List
from datetime import datetime, timedelta
from backend.db.data_messages import Record
from .metrics_types import MessagesMetricsResponse, AttackTypeCount

async def get_messages_metrics(
    type: str | None = None,
    startDate: str | None = None,
    endDate: str | None = None
) -> MessagesMetricsResponse:
    # Základní query
    query = Record.find({}, with_children=True)

    # Filtr podle typu
    if type:
        query = query.find({'type': type})

    # Filtr podle datového rozsahu
    if startDate and endDate:
        query = query.find({
            'timestamp': {
                '$gte': datetime.fromisoformat(startDate.replace('Z', '')),
                '$lte': datetime.fromisoformat(endDate.replace('Z', ''))
            }
        })

    # Získáme všechny záznamy pro výpočet metrik
    records = await query.to_list()
    
    # Výpočet metrik
    total_count = len(records)
    syslog_count = len([r for r in records if r.type == "syslog"])
    dataflow_count = len([r for r in records if r.type == "dataflow"])
    threats_count = len([r for r in records if r.threat])
    
    # Výpočet útoků podle typu
    attacks_by_type = []
    attack_counts = {}
    for record in records:
        if record.threat:
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