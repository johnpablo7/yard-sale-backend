Equivale a ambos llamados de la linea 3 hasta 6
docker-compose up -d
docker-compose up -d postgres
docker-compose up -d phpmyadmin
docker-compose up -d pgadmin
docker-compose up -d mysql

Para correr el proyecto de node
npm run dev

Para consultar
docker-compose ps

Para retirar el contenedor
docker-compose down

Recordar ignorar estos doc. en el .gitignore
postgres_data
mysql_data

(http://localhost:8080/) || phpMyAdmin
(http://localhost:5050/) || pgAdmin

Para generar tablas:
npm run migrations:generate (nombre de la tabla ejemplo: create-customers)
