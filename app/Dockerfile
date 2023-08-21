# Caution: Only use this file with docker compose. It won't work without.

FROM node:18.17-alpine

WORKDIR /usr/src/app

COPY app/package.json app/yarn.lock app/.yarnrc.yml ./
COPY app/.yarn ./.yarn/

RUN yarn install

CMD ["yarn", "dev:docker"]
