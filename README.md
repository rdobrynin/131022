## Installation

```bash
$ docker-compose up
```

(Optional) If require add dependencies on local please run
```bash
$ npm install
```

## Access to app container
```bash
# enter to app container
$ docker exec -it {containerId} bash
```

Added 2 ep

1. [GET http://localhost:3001/public](http://localhost:3001/public)
2. [POST http://localhost:3001/auth](http://localhost:3001/auth)

Added 2 endpoints to Postman Rest client.
See outvio.postman_collection.json in root folder

## Logic
Added module structure for NestJS and dockerized it.

For auth private endpoint uses header x-api-token (see please .env file API_TOKEN key)
and request accept middleware.

For public ep uses decorator, where getting ip address, and logic passes via service.

Added configs for MONGO and client mongo-express.
Related to requirements ijn test-assignment, no need save any data on mongo (saved in env vars), 
but everything is ready for crud any data.



## Access to Redis

```bash
# enter to container
$ docker exec -it {containerId} bash

# access to cli
$ redis-cli
```