FROM node:22 as build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:22-slim as production

WORKDIR /usr/src/app

RUN mkdir -p /bitnami/postgresql
RUN chown -R 1001:1001 /bitnami/postgresql

COPY --from=build /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3333

CMD ["yarn", "start"]