# backend\schema\query\messages\attack_types_resolver.py
from typing import List, Optional
from datetime import datetime
from backend.db.data_messages import Record
from backend.filters.base import BaseFilter
from .attack_types import AttackTypeDistribution

async def get_attack_types_distribution(
    type: Optional[str] = None,
    startDate: Optional[str] = None,
    endDate: Optional[str] = None,
    threat: Optional[bool] = None
) -> List[AttackTypeDistribution]:
    """
    Získá distribuci typů útoků (attack_type) včetně jejich početního zastoupení.

    Funkce umožňuje flexibilní filtrování dat před agregací podle:
    - Typu záznamu (syslog/dataflow)
    - Příznaku hrozby 
    - Časového rozsahu

    Parametry:
    - type: Filtr pro typ záznamu (syslog/dataflow/all)
    - startDate: Počáteční datum pro filtrování (ISO formát)
    - endDate: Koncové datum pro filtrování (ISO formát)
    - threat: Filtr pro hrozby (True/False/None)

    Vrací:
    - Seznam objektů AttackTypeCount obsahující typy útoků a jejich počet
    - Seřazeno sestupně podle počtu výskytů
    """
    
    # Základní query
    query = Record.find({}, with_children=True)

    # Aplikace filtrů pomocí BaseFilter
    query = BaseFilter.apply(query, 'type', type)
    query = BaseFilter.apply(query, 'threat', threat)
    query = BaseFilter.apply_date_range(query, startDate, endDate)
    
    # MongoDB agregační pipeline
    pipeline = [
        # Stage 1: Group - agregace podle typu útoku
        {
            "$group": {
                "_id": "$attack_type",
                "count": { "$sum": 1 }
            }
        },
        # Stage 2: Sort - seřazení podle počtu výskytů
        {
            "$sort": {
                "count": -1
            }
        }
    ]
    
    # Provedení agregace
    result = await query.aggregate(pipeline).to_list()
    
    # Transformace výsledků
    return [
        AttackTypeDistribution(
            attack_type=item['_id'],
            count=item['count']
        )
        for item in result
    ]