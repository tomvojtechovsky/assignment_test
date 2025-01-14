import strawberry

@strawberry.type
class ActivityDataPoint:
    """Datový bod aktivity systému"""
    label: str
    count: int