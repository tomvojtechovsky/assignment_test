import strawberry
from typing import List, Union, Optional
from datetime import datetime
from backend.db.data_messages import Record
from .types import MessagesResponse, DataflowMessage, SyslogMessage

async def get_messages(
    limit: int = 500, 
    offset: int = 0,
    type: str | None = None,
    startDate: str | None = None,  # Změna na startDate
    endDate: str | None = None     # Změna na endDate
) -> MessagesResponse:
    # Základní query s řazením od nejnovějších
    query = Record.find({}, with_children=True).sort('-timestamp')

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