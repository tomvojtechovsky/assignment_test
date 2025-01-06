# backend/schema/mutations.py
import strawberry
from .mutations.auth import AuthorizationMutations

@strawberry.type
class Mutation:
    """Hlavní Mutation schéma pro operace autentifikace"""
    auth: AuthorizationMutations = strawberry.field(resolver=lambda: AuthorizationMutations())
