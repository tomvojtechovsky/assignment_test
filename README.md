# Project setup

## Prerequisites

Install the following tools:

- make
- Python 3.11
- docker-compose
- npm

## Installation

### Backend

1. Install backend dependencies:
    ```shell
    make setup-backend
    ```

2. Run Backend

    Start database and run Fast API application:
    
    ```shell
    make run-backend
    ```

3. Stop database

    When you finish your work, you can stop database:
    ```shell
    make stop-database
    ```

### Frontend

1. Install frontend dependencies:
    ```shell
    make setup-frontend
    ```

2. Run frontend
    ```shell
    make run-frontend
    ```

You can clear setup data with command:
```shell
make clean
```
