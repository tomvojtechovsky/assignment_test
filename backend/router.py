from fastapi import APIRouter
from fastapi.responses import RedirectResponse, Response
from strawberry import Schema
from strawberry.fastapi import GraphQLRouter

from backend.schema.mutations import Mutation
from backend.schema.query import Query
from backend.utils import get_context

router = APIRouter()

graphql_router = GraphQLRouter(
    Schema(
        query=Query,
        mutation=Mutation,
    ),
    graphql_ide="graphiql",
    context_getter=get_context,
)

router.include_router(graphql_router, prefix="/graphql")


@router.get("/")
def default_route() -> Response:
    """Default route is set to /graphql."""
    return RedirectResponse(url="/graphql")
