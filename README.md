install Redis
To start redis:
redis-server

install erlang from "https://www.erlang.org/downloads"

install RabbitMq

# starts a local RabbitMQ node

brew services start rabbitmq

# stops the locally running RabbitMQ node

brew services stop rabbitmq

npm install amqplib

## After configuring docker compose file

RUN
docker compose build
docker compose up

# To checker the running docker service

docker ps
docker-compose ps

### To check a service log

docker-compose logs [service name][e.g api-gateway]

## Youtube link: [Youtube](https://www.youtube.com/watch?v=_f7h6xQXiLA)
