FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npx nuxt build
RUN npx nuxt generate

ENV HOST 0.0.0.0
EXPOSE 9090

CMD npx nuxt start
