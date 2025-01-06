#backend\schema\mutations\auth\__init__.py
import strawberry
from backend.schema.mutations.auth.resolver import login  # Importujeme resolver pro login mutaci
from backend.schema.mutations.auth.resolver import logout

@strawberry.type
class AuthorizationMutations:
    """Správa operací týkajících se autentifikace (přihlášení, odhlášení)"""
    
    # Propojení login mutace s resolverem
    login = strawberry.field(resolver=login)  # Definice mutace login, která používá resolver login
    logout = strawberry.field(resolver=logout)

