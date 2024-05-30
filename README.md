## Instalation

PD: node: > v-18

Install the node dependencies with the following command:

npm install

Create DB local

create db (jelou) use Postgres

DBuser: postgres

PasswordDB:root

Run start project:

for dev: npm run start:dev

for prod: npm run start

## Stay in touch

- Author - Alexis Duque
- framework - [@nestframework](https://twitter.com/nestframework)

## .env config

    #DATABASE

DATABASE_HOST='127.0.0.1'
DATABASE_PORT=5432
DATABASE_USERNAME='postgres'
DATABASE_PASSWORD='root'
DATABASE_NAME='jelou'

    #APP

PORT=8005

## documentacion

http://localhost:8005/docs

## Testing Endpoint

**Controlers Task:**
#Methodo

1. -POST http://localhost:8005/taskList/create
   body : {
   "title": "The task two",
   "assign_to": "Alexis Duque",
   "status_type_message": "PENDING"
   }

2. -PUT http://localhost:8005/taskList/update/id
   {
   "title": "la tarea cinco",
   "assign_to": "Alexis Duque",
   "status_type_message": "PENDING"
}

3. -GET http://localhost:8005/taskList/details/id
  params(id=1234)

4. -DELETE http://localhost:8005/taskList/delete/id
params(id=1234)

## License

Nest is [MIT licensed](LICENSE).
