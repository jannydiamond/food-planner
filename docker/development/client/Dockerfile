FROM node:18-alpine

WORKDIR /app

# NOTE:
# The whole file will be run by docker compose, which sets the
# context to the root directory of the repository!

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./tsconfig.json ./

EXPOSE 3000

CMD ["yarn", "start"]
