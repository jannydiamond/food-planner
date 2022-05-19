FROM node:18-alpine

WORKDIR /server

RUN chown -R node /server
RUN chown -R node /usr/local

USER node

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./buildServer.js ./

COPY ./src/server ./src/

RUN yarn

COPY ./tsconfig.json ./
COPY ./tsconfig.server.json ./

EXPOSE 8080

CMD ["yarn", "start:server"]
