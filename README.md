Inicializar nuestra DB:
docker-compose up -d | (Todas las bases de datos en Docker)

Utilizadas:
docker-compose up -d postgres
docker-compose up -d pgadmin
docker-compose ps

docker-compose up -d phpmyadmin
docker-compose up -d mysql

Ejecutar el proyecto
npm run dev

Generar y ejecutar tablas:
npm run migrations:generate (nombre de la tabla ejemplo: create-user)
npm run migrations:run

Para consultar la IPAddress donde corre pgadmin:
docker ps
docker inspect 590585ef32f8 <--- + id del contededor postgres "IPAddress": "172.24.0.2",

Para retirar un contenedor en Docker:
docker-compose down

(http://localhost:8080/) || phpMyAdmin

Recordar ignorar estos archivos en el .gitignore:
postgres_data
mysql_data
