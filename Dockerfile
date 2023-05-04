# [BASE] LAYER
FROM node:19-alpine AS base

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn install

# [BUILD] LAYER
FROM base AS build

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn install

COPY . .

RUN yarn build

# [PRODUCTION] LAYER
FROM node:19-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT='3000'
ENV MONGODB_URI='mongodb://mongo:27017/innovadb'
ENV PAYLOAD_SECRET_KEY='dc4d364eefdb590ede0212e0'
ENV NEXT_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
ENV PAYLOAD_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
ENV PAYLOAD_CONFIG_PATH='dist/src/payload.config.js'
ENV NEXT_PUBLIC_MEILISEARCH_URL='http://127.0.0.1:7700'
ENV IMAGE_DOMAIN='127.0.0.1'
ENV NEXT_SHARP_PATH='/app/node_modules/sharp'

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn workspaces focus --all --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["node", "dist/src/server.js"]

# OLD DOCKERFILE
# FROM base as builder

# WORKDIR /app
# COPY package*.json yarn.lock* ./

# RUN yarn set version berry

# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./

# RUN yarn install

# COPY . .

# RUN yarn build

# FROM base as runtime

# ENV NODE_ENV=production
# ENV PORT='3000'
# ENV MONGODB_URI='mongodb://127.0.0.1:27017/innovadb'
# ENV PAYLOAD_SECRET_KEY='dc4d364eefdb590ede0212e0'
# ENV NEXT_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
# ENV PAYLOAD_PUBLIC_SERVER_URL='http://127.0.0.1:3000'
# ENV PAYLOAD_CONFIG_PATH='dist/src/payload.config.js'
# ENV NEXT_PUBLIC_MEILISEARCH_URL='http://127.0.0.1:7700'
# ENV IMAGE_DOMAIN='127.0.0.1'

# WORKDIR /app
# COPY package*.json yarn.lock* ./

# RUN yarn set version berry

# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./

# RUN yarn workspaces focus --all --production
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/build ./build
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules/sharp /app/node_modules/sharp

# EXPOSE 3000

# ENTRYPOINT ["node", "dist/src/server.js"]
