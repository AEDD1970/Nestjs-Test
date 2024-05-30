

## Instalation
  node: v-18
  use npm i for dependens
  dev: npm run start:dev
  prod: npm run start
  create db jelou use Postgres
## Stay in touch

- Author - Alexis Duque
- linkeding - [@nestframework](https://twitter.com/nestframework)
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

http://localhost:8005/docs#/

## Test for Postman
  #Methodo
  -POST http://localhost:8005/taskList/create
    body : {
    "title": "The task two",
    "assign_to": "Alexis Duque",
    "status_type_message": "PENDING" 
}
  -PUT http://localhost:8005/taskList/update/id
  {
    "title": "la tarea cinco",
    "assign_to": "Alexis Duque",
    "status_type_message": "PENDING"
    
}
  -GET http://localhost:8005/taskList/details/id
   params(id)
   -DELETE http://localhost:8005/taskList/delete/id
   params(id)


## License

Nest is [MIT licensed](LICENSE).
