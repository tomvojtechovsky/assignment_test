# backend/schema/query/messages/activity_resolver.py
import strawberry
from typing import List, Optional
from datetime import datetime, timedelta

import sys
import logging
from backend.db.data_messages import Record, DataflowData, SyslogData
from .metrics_types import ActivityDataPoint

logger = logging.getLogger('strawberry.query')
logger.setLevel(logging.DEBUG)

logger = logging.getLogger(__name__)

@strawberry.type
class ActivityDataPoint:
    """Datový bod aktivity systému"""
    label: str
    count: int

async def aggregate_all_data(type: Optional[str] = None) -> List[ActivityDataPoint]:
   try:
       query = Record.find({}, with_children=True)
       if type and type != 'all':
           query = query.find({'type': type})

       records = await query.to_list()
       logger.debug(f"Found {len(records)} records")

       daily_counts = {}
       for record in records:
           day = record.timestamp.date()
           daily_counts[day] = daily_counts.get(day, 0) + 1

       result = [
           ActivityDataPoint(
               label=day.strftime('%d. %m.'),
               count=count
           )
           for day, count in sorted(daily_counts.items())
       ]

       logger.debug(f"Aggregated {len(result)} daily points")
       return result

   except Exception as e:
       logger.error(f"Error aggregating all data: {e}", exc_info=True)
       return []
   

async def get_activity_data(
   period: str,
   startDate: Optional[str] = None,
   endDate: Optional[str] = None,
   type: Optional[str] = None
) -> List[ActivityDataPoint]:
   try:
       logger.debug(f"Fetching activity data for period: {period}, type: {type}")
       now = datetime.utcnow()

       if period == 'all':
           data = await aggregate_all_data(type)
       elif period == 'custom':
           if not startDate and not endDate:
               data = await aggregate_all_data(type)
           else:
               start_date = datetime.fromisoformat(startDate.replace('Z', '')) if startDate else None
               end_date = datetime.fromisoformat(endDate.replace('Z', '')) if endDate else now
               days_diff = (end_date - (start_date or now - timedelta(days=365))).days
               data = await aggregate_by_weeks(start_date, end_date, type) if days_diff > 90 else await aggregate_by_days(start_date, end_date, type)
       elif period == 'week':
           start_date = now - timedelta(days=7)
           data = await aggregate_by_days(start_date, now, type)
       elif period == 'month':
           start_date = now - timedelta(days=30)
           data = await aggregate_by_days(start_date, now, type)
       elif period == 'year':
           start_date = now - timedelta(days=365)
           data = await aggregate_by_weeks(start_date, now, type)
       else:
           return []

       logger.debug(f"Returning {len(data)} data points")
       return data

   except Exception as e:
       logger.error(f"Error processing activity: {e}", exc_info=True)
       return []



async def aggregate_by_days(start_date: datetime, end_date: datetime, type: Optional[str] = None) -> List[ActivityDataPoint]:
    try:
        # Základní query
        query = Record.find({}, with_children=True)

        # Filtr podle typu
        if type and type != 'all':
            query = query.find({'type': type})

        # Filtr podle datového rozsahu
        if start_date and end_date:
            query = query.find({
                'timestamp': {
                    '$gte': start_date,
                    '$lte': end_date
                }
            })
        elif start_date:
            query = query.find({
                'timestamp': {
                    '$gte': start_date
                }
            })
        elif end_date:
            query = query.find({
                'timestamp': {
                    '$lte': end_date
                }
            })

        records = await query.to_list()
        logger.debug(f"Found {len(records)} records")

        # Agregace po dnech
        daily_counts = {}
        for record in records:
            day = record.timestamp.date()
            daily_counts[day] = daily_counts.get(day, 0) + 1

        result = [
            ActivityDataPoint(
                label=day.strftime('%d. %m.'),
                count=count
            )
            for day, count in sorted(daily_counts.items())
        ]

        return result

    except Exception as e:
        logger.error(f"Error in daily aggregation: {e}", exc_info=True)
        return []



async def aggregate_by_weeks(start_date: datetime, end_date: datetime, type: Optional[str] = None) -> List[ActivityDataPoint]:
   try:
       query = Record.find({}, with_children=True)

       if type and type != 'all':
           query = query.find({'type': type})

       if start_date and end_date:
           query = query.find({
               'timestamp': {
                   '$gte': start_date,
                   '$lte': end_date
               }
           })
       elif start_date:
           query = query.find({
               'timestamp': {
                   '$gte': start_date
               }
           })
       elif end_date:
           query = query.find({
               'timestamp': {
                   '$lte': end_date
               }
           })

       records = await query.to_list()
       logger.debug(f"Found {len(records)} records")

       # Agregace po týdnech
       weekly_counts = {}
       for record in records:
           week_start = record.timestamp - timedelta(days=record.timestamp.weekday())
           weekly_counts[week_start.date()] = weekly_counts.get(week_start.date(), 0) + 1

       result = [
           ActivityDataPoint(
               label=f'Týden {week.isocalendar()[1]}',
               count=count
           )
           for week, count in sorted(weekly_counts.items())
       ]

       return result

   except Exception as e:
       logger.error(f"Error in weekly aggregation: {e}", exc_info=True)
       return []