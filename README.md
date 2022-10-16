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

or use cURL
```bash
# POST auth with header x-api-token
$ curl --location --request POST 'localhost:3001/auth' \
--header 'Content-Type: application/json' \
--header 'x-api-token: 5763c25b-b86d-48dc-9ff0-4af7067fd960'
```

```bash
# GET public endpoint
$ curl -v http://localhost:3001/public
```

For invalid api token please change for whatever to get Bad request

## Logic
Added module structure for NestJS and dockerized it.

For auth private endpoint uses header x-api-token via Middleware (see please .env file API_TOKEN key).

For both EPs use global APP_INTERCEPTOR to get IP address, and pass logic throttle via service.

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