#backend\filters\base.py
from datetime import datetime
from typing import Optional
import logging

logger = logging.getLogger('strawberry.query')
logger.setLevel(logging.DEBUG)

logger = logging.getLogger(__name__)

class BaseFilter:
   @classmethod
   def apply(cls, query, field: str, value):
        """
        Generický filtr pro aplikaci na MongoDB query.
        
        Parametry:
        - query: MongoDB query objekt
        - field: Název pole pro filtrování
        - value: Hodnota pro filtr
        
        Podporuje speciální případy:
        - threat: Filtruje True/False, None vrací vše
        - type: Filtruje syslog/dataflow, 'all' vrací vše
        """
        print(f"BaseFilter - Field: {field}, Value: {value}")  # Debug výstup
        logger.debug(f"BaseFilter - Field: {field}, Value: {value}")  # Debug výstup

        try:
            if value is None:
                return query
               
            if field == 'threat':
                query_filter = {field: value}
                return query.find(query_filter)
               
            if field == 'type':
                if value == 'all':
                    return query
                return query.find({field: value})
               
            return query.find({field: value})
           
        except Exception as e:
           print(f"Error applying filter: {e}")
           raise

   @classmethod
   def apply_date_range(cls, query, startDate: Optional[str] = None, endDate: Optional[str] = None):
       """
       Aplikuje časový filtr na MongoDB query.
       
       Parametry:
       - query: MongoDB query objekt
       - startDate: Počáteční datum jako ISO string (může být None)
       - endDate: Koncové datum jako ISO string (může být None)
       
       Vrací:
       - Upravený query objekt s časovým filtrem
       """

       try:
           # Pokud nemáme žádné datum, vrátíme původní query
           if not startDate and not endDate:
               return query

           # Vytvoříme podmínky pro časový filtr
           time_conditions = {}
           
           # Zpracování počátečního data
           if startDate:
               start = datetime.fromisoformat(startDate.replace('Z', ''))
               time_conditions['$gte'] = start
               
           # Zpracování koncového data
           if endDate:
               end = datetime.fromisoformat(endDate.replace('Z', ''))
               time_conditions['$lte'] = end
           
           # Aplikace časového filtru
           return query.find({'timestamp': time_conditions})
           
       except Exception as e:
           print(f"Error applying date range filter: {e}")
           raise