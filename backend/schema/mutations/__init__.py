import strawberry

from backend.schema.mutations.auth import AuthorizationMutations


@strawberry.type
class Mutation:
    auth: AuthorizationMutations = strawberry.field(resolver=AuthorizationMutations)
