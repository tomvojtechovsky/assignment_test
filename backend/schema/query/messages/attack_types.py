#backend\schema\query\messages\attack_types.py
import strawberry

@strawberry.type
class AttackTypeDistribution:
    attack_type: str  # typ útoku
    count: int # počet výskytů