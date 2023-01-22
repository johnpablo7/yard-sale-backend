FROM node:16 AS build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN echo "The NODE_ENV variable value is $NODE_ENV"

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run migrations:run

EXPOSE 8080

CMD ["npm", "start"]
