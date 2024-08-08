# Bhargavs Project

## important files to get started:

- src/hooks.server.ts
- src/lib/db/schema.ts

# USAGE

## Development
to start the database

```
docker compose up
```
start development server

```
pnpm install 
pnom run dev
```

## Production

to start production server and database 
```
docker compose -f .\docker-compose.prod.yaml up --build
```