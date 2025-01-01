setup-backend:
	python -m venv .assignment
	.\.assignment\Scripts\activate && \
	pip install --upgrade pip && \
	pip install poetry && \
	poetry install --no-root

setup-frontend:
	cd frontend && npm install

clean:
	if exist .assignment rmdir /s /q .assignment
	if exist frontend\node_modules rmdir /s /q frontend\node_modules

lint:
	.\.assignment\Scripts\activate && \
	black backend/ && \
	ruff backend/

run-backend:
	.\.assignment\Scripts\activate && \
	docker-compose up -d && \
	uvicorn backend.app:get_app --reload --factory

stop-database:
	docker-compose down

run-frontend:
	cd frontend && npm run dev

pack:
	powershell Compress-Archive -Path ASSIGNMENT.md,backend/,frontend/,docker-compose.yml,Makefile,poetry.lock,pyproject.toml,README.md -DestinationPath ../assignment.zip -Force

