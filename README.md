# CRUD_MySQL_React_Redux_classes

Example of CRUD basic functionality in MySQL database.

    Front:      React + Redux
    Back:       Node + Express
    Database:   MySQL + Sequelize
__________________________________________________________________

1.  Active MySQL server's needed.

2.  Rename file '.env.example' into '.env' and setup enviroment variables.

3.  Download project from GIT, open it with code redactor and use following commands from terminal/console:
   
        3.1. npm install - needed modules installation;
        3.2. npm start - code start.

4.  Available endpoints (xxxx - connection port from .env):

        http://localhost:xxxx/api/products/
        
        GET     - get list of products.
        POST    - add new products in list.
        
        http://localhost:xxxx/api/products/:id

        PUT     - edit product info (by product ID).
        DELETE  - delete product from list (by product ID).