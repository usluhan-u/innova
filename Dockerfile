# [BASE] LAYER
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn install

# [BUILD] LAYER
FROM base AS build

WORKDIR /app

COPY . .

RUN yarn build

# [PRODUCTION] LAYER
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn workspaces focus --all --production

COPY --from=build /app/dist ./
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["node", "src/server.js"]
