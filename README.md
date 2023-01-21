Equivale a ambos llamados de la linea 3 hasta 6
docker-compose up -d
docker-compose up -d postgres
docker-compose up -d pgadmin
docker-compose up -d phpmyadmin
docker-compose up -d mysql

Para correr el proyecto de node
npm run dev

Para consultar
docker-compose ps
docker ps
docker inspect 590585ef32f8 <--- + id del contededor postgres "IPAddress": "172.24.0.2",

Para generar tablas Y correrlas:
npm run migrations:generate (nombre de la tabla ejemplo: create-customers)
npm run migrations:run

Para retirar el contenedor
docker-compose down

(http://localhost:8080/) || phpMyAdmin
(http://localhost:5050/) || pgAdmin

Recordar ignorar estos doc. en el .gitignore
postgres_data
mysql_data
