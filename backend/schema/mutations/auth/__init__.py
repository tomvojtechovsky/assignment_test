import strawberry

from backend.schema.mutations.auth.resolver import login


@strawberry.type
class AuthorizationMutations:
    """Management of authorization related operations.

    This class is used for login and logout mutations.
    """
    login = strawberry.field(resolver=login)
