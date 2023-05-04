FROM node:18-alpine as base

FROM base as builder

WORKDIR /app
COPY package*.json ./

RUN yarn set version berry

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY . .

RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PORT='3000'
ENV MONGODB_URI='mongodb://127.0.0.1:27017/innovadb'
ENV PAYLOAD_SECRET_KEY='dc4d364eefdb590ede0212e0'
ENV NEXT_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
ENV PAYLOAD_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
ENV PAYLOAD_CONFIG_PATH='dist/src/payload.config.js'
ENV NEXT_PUBLIC_MEILISEARCH_URL='http://127.0.0.1:7700'
ENV IMAGE_DOMAIN='127.0.0.1'

WORKDIR /app
COPY package*.json  ./

RUN yarn set version berry

COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn workspaces focus --all --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

ENTRYPOINT ["node", "dist/src/server.js"]
