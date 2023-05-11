# [BASE] LAYER
FROM node:19-alpine AS base

WORKDIR /app

# COPY package*.json yarn.lock* ./
# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./
COPY package*.json ./

# RUN yarn install --immutable
RUN npm install

# [BUILD] LAYER
FROM base AS build

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN npm run build

# [PRODUCTION] LAYER
FROM node:19-alpine AS production

WORKDIR /app

# COPY package*.json yarn.lock* ./
# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./
COPY package*.json ./

# RUN yarn workspaces focus --all --production

RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
