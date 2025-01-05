import strawberry
from backend.schema.query import Query  # Změněno
from backend.schema.mutations import Mutation

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation
)