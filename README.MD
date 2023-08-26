#### Project Setup

In order to spin up the project, in the root create .env with these variables, with your own values (all must be string values).

MONGO_USERNAME

MONGO_PASSWORD 

SERVER_PORT

JWT_KEY

then go to src/config/config.ts , and edit MONGO_URL as your own connection string.

After that run this command

```bash
nodemon
```