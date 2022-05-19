FROM node:18-alpine

WORKDIR /server

# NOTE:
# The whole file will be run by docker compose, which sets the
# context to the root directory of the repository!

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /server/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./tsconfig.json ./
COPY ./tsconfig.server.json ./
COPY ./buildServer.js ./

EXPOSE 8080

CMD ["yarn", "start:server"]
