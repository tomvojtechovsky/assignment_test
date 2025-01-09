import strawberry
from typing import List, Union, Optional
from datetime import datetime
from backend.db.data_messages import Record
from backend.filters.base import BaseFilter
from .types import MessagesResponse, DataflowMessage, SyslogMessage

async def get_messages(
    limit: int = 500, 
    offset: int = 0,
    type: Optional[str] = None,
    startDate: Optional[str] = None,
    endDate: Optional[str] = None,
    threat: Optional[bool] = None
) -> MessagesResponse:
    # Základní query s řazením od nejnovějších
    query = Record.find({}, with_children=True).sort('-timestamp')
    
    # Aplikace filtrů pomocí BaseFilter
    query = BaseFilter.apply(query, 'type', type)
    query = BaseFilter.apply(query, 'threat', threat)
    
    # Filtr podle datového rozsahu
    if startDate and endDate:
        # Oba data jsou vyplněny - filtruj rozsah
        query = query.find({
            'timestamp': {
                '$gte': datetime.fromisoformat(startDate.replace('Z', '')),
                '$lte': datetime.fromisoformat(endDate.replace('Z', ''))
            }
        })
    elif startDate:
        # Jen počáteční datum - filtruj od tohoto data
        query = query.find({
            'timestamp': {
                '$gte': datetime.fromisoformat(startDate.replace('Z', ''))
            }
        })
    elif endDate:
        # Jen koncové datum - filtruj do tohoto data
        query = query.find({
            'timestamp': {
                '$lte': datetime.fromisoformat(endDate.replace('Z', ''))
            }
        })
    
    total = await query.count()
    # Správné stránkování s maximálním limitem 500
    limit = min(limit, 500)
    records = await query.skip(offset).limit(limit).to_list()
    items = []
    for record in records:
        base_params = {
            'timestamp': record.timestamp,
            'probeIp': record.probe_ip,
            'probeName': record.probe_name,
            'content': record.content,
            'threat': record.threat,
            'type': record.type,
            'attackType': record.attack_type
        }
        if record.type == "dataflow":
            items.append(DataflowMessage(
                **base_params,
                sourceIp=record.source_ip,
                sourcePort=record.source_port,
                targetIp=record.target_ip,
                targetPort=record.target_port
            ))
        else:
            items.append(SyslogMessage(**base_params))
    
    return MessagesResponse(
        items=items,
        totalCount=min(total, 500),
        hasMore=(total > offset + limit)
    )