#!/bin/bash

# if ! [ -x "$(command -v docker)" ]; then
#   echo 'Error: docker is not installed.' >&2
#   exit 1
# fi

# echo "### Stopping docker container..."
# docker stop innova

# echo "### Removing docker container..."
# docker rm innova

# echo "### Removing docker image..."
# docker rmi payload

# echo "### Building docker image..."
# docker build -t payload .

# echo "### Starting docker container..."
# docker run -dp 3000:3000 --name innova payload

docker-compose -f docker-compose.prod.yml up -d
