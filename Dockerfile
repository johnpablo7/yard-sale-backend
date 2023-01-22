FROM node:16 AS build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run migrations:run

EXPOSE 8080

CMD ["npm", "start"]
