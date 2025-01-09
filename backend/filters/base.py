class BaseFilter:
    @classmethod
    def apply(cls, query, field: str, value):
        """Generický filtr, který lze aplikovat na různá pole"""
        print(f"Applying filter - Field: {field}, Value: {value}")  # Debug výstup
        try:
            if value is not None:
                return query.find({field: value})
            elif field == 'threat':  # Speciální zacházení pro pole 'threat'
                return query.find({field: {'$in': [True, False]}})
            return query
        except Exception as e:
            print(f"Error applying filter: {e}")
            raise  # Přepošle výjimku dál, aby byla zachycena a zpracována na vyšší úrovni