```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
docker exec -it  container bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v

```