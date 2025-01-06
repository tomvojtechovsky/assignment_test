# backend/schema/middleware.py
from strawberry.extensions import Extension
from strawberry.types import Info

class AuthMiddleware(Extension):
    def on_execute_operation(self, operation_name, root, args, info: Info):
        if not info.context.request.state.authenticated:
            raise Exception("Not authenticated")