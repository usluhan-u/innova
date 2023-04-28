FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=build/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./

RUN yarn workspaces focus --all --production
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "build/server.js"]
