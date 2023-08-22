# Caution: Only use this file with docker compose. It won't work without.

FROM node:18.17-alpine
RUN apk add g++ make py3-pip
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY app/package.json app/pnpm-lock.yaml ./

RUN pnpm install

CMD ["pnpm", "dev:docker"]
