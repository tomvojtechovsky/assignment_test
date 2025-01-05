# backend/schema/query/messages/activity_resolver.py
import strawberry
from typing import List
from datetime import datetime, timedelta
import logging
from backend.db.data_messages import Record, DataflowData, SyslogData

logger = logging.getLogger(__name__)

@strawberry.type
class ActivityDataPoint:
    """Datový bod aktivity systému"""
    label: str
    count: int

async def get_activity_data(period: str) -> List[ActivityDataPoint]:
    """
    Získá aktivitu systému pro zadané období
    
    Args:
        period (str): Období - 'week', 'month', 'year'
    """
    try:
        # Nastavení logování
        logger.setLevel(logging.DEBUG)
        
        now = datetime.utcnow()
        logger.debug(f"Aktuální čas: {now}")

        # Kontrola počtu záznamů v databázi
        total_records_syslog = await SyslogData.find_all().count()
        total_records_dataflow = await DataflowData.find_all().count()
        logger.debug(f"Počet syslog záznamů: {total_records_syslog}")
        logger.debug(f"Počet dataflow záznamů: {total_records_dataflow}")

        if period == 'week':
            start_date = now - timedelta(days=7)
            data = await aggregate_by_days(start_date, now)
        
        elif period == 'month':
            start_date = now - timedelta(days=30)
            data = await aggregate_by_days(start_date, now)
        
        elif period == 'year':
            start_date = now - timedelta(days=365)
            data = await aggregate_by_weeks(start_date, now)
        
        else:
            data = []

        logger.debug(f"Vracím {len(data)} datových bodů")
        return data

    except Exception as e:
        logger.error(f"Chyba při zpracování aktivity: {e}", exc_info=True)
        return []

async def aggregate_by_days(start_date: datetime, end_date: datetime) -> List[ActivityDataPoint]:
    """Agregace dat po dnech"""
    try:
        # Hledání v obou typech záznamů
        query_syslog = SyslogData.find({
            'timestamp': {
                '$gte': start_date,
                '$lte': end_date
            }
        })
        
        query_dataflow = DataflowData.find({
            'timestamp': {
                '$gte': start_date,
                '$lte': end_date
            }
        })
        
        syslog_records = await query_syslog.to_list()
        dataflow_records = await query_dataflow.to_list()
        
        # Kombinované záznamy
        records = syslog_records + dataflow_records
        
        logger.debug(f"Počet syslog záznamů v intervalu: {len(syslog_records)}")
        logger.debug(f"Počet dataflow záznamů v intervalu: {len(dataflow_records)}")

        # Agregace po dnech
        daily_counts = {}
        for record in records:
            day = record.timestamp.date()
            daily_counts[day] = daily_counts.get(day, 0) + 1
        
        # Příprava dat pro graf
        result = [ 
            ActivityDataPoint(
                label=day.strftime('%d. %m.'),  # Změna z '%d.%m' na '%d. %m.'
                count=count
            ) 
            for day, count in sorted(daily_counts.items())
        ]
        
        logger.debug(f"Agregované denní body: {result}")
        return result

    except Exception as e:
        logger.error(f"Chyba při agregaci dnů: {e}", exc_info=True)
        return []

async def aggregate_by_weeks(start_date: datetime, end_date: datetime) -> List[ActivityDataPoint]:
    """Agregace dat po týdnech"""
    try:
        # Hledání v obou typech záznamů
        query_syslog = SyslogData.find({
            'timestamp': {
                '$gte': start_date,
                '$lte': end_date
            }
        })
        
        query_dataflow = DataflowData.find({
            'timestamp': {
                '$gte': start_date,
                '$lte': end_date
            }
        })
        
        syslog_records = await query_syslog.to_list()
        dataflow_records = await query_dataflow.to_list()
        
        # Kombinované záznamy
        records = syslog_records + dataflow_records
        
        # Agregace po týdnech
        weekly_counts = {}
        for record in records:
            week_start = record.timestamp - timedelta(days=record.timestamp.weekday())
            weekly_counts[week_start.date()] = weekly_counts.get(week_start.date(), 0) + 1
        
        # Příprava dat pro graf
        result = [
            ActivityDataPoint(
                label=f'Týden {week.isocalendar()[1]}',
                count=count
            ) 
            for week, count in sorted(weekly_counts.items())
        ]
        
        logger.debug(f"Agregované týdenní body: {result}")
        return result

    except Exception as e:
        logger.error(f"Chyba při agregaci týdnů: {e}", exc_info=True)
        return []