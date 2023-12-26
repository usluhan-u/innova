# [BASE] LAYER
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN npm install

# [BUILD] LAYER
FROM base AS build

WORKDIR /app

COPY . .

RUN npm run build

# [PRODUCTION] LAYER
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json yarn.lock* ./
COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN npm install --only=prod

COPY --from=build /app/dist ./
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["node", "src/server.js"]
