# backend\schema\__init__.py
import strawberry
from backend.schema.query import Query  # Importujeme Query třídu pro GraphQL dotazy
from backend.schema.mutations import Mutation  # Importujeme Mutation třídu pro GraphQL mutace

# Vytvoření GraphQL schématu s dotazy a mutacemi
schema = strawberry.Schema(
    query=Query,     # Nastavíme Query třídu pro dotazy
    mutation=Mutation  # Nastavíme Mutation třídu pro mutace
)