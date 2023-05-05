#!/bin/bash

ENV_FILE_PATH=".env"

if ! [ -e "$ENV_FILE_PATH" ]; then
  echo "$ENV_FILE_PATH file does not exist. Create an .env file under corresponding path!" >&2
  exit 1
fi

if ! [ -x "$(command -v docker)" ]; then
  echo 'Error: docker is not installed.' >&2
  exit 1
fi

# echo "### Stopping docker container..."
docker stop payload

# echo "### Removing docker container..."
docker rm payload

# echo "### Removing docker image..."
docker rmi payload

# echo "### Building docker image..."
# docker build -t payload .

# echo "### Starting docker container..."
# docker run -dp 3000:3000 --name innova payload

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

# docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d
