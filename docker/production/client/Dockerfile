FROM node:18-alpine as build

WORKDIR /site

COPY . .

RUN yarn
RUN yarn build

FROM caddy:2.5.1-alpine

COPY --from=build /site/build /srv
