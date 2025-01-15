#!/bin/bash

# Stop existing container using port 3000
container_id=$(docker ps --filter "ancestor=web:latest" --format "{{.ID}}")
if [ ! -z "$container_id" ]; then
    echo "Stopping existing container with ID $container_id"
    docker stop $container_id
fi

# Remove stopped containers
docker container prune -f

# Build Docker image without cache
docker build -t web:latest . --no-cache

# Run the container
docker run -d -p 3000:3000 web:latest
