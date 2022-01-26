FROM node:16.13.2-alpine

ENV NODE_ENV=development

RUN groupadd -r node && useradd -g node node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

RUN npx sequelize db:migrate

EXPOSE 3000