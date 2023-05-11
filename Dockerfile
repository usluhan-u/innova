# [BASE] LAYER
FROM node:19-alpine AS base

WORKDIR /usr/app

RUN npm install -g npm

# COPY package*.json yarn.lock* ./
# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./
COPY package*.json ./

# RUN yarn install --immutable
RUN npm install --legacy-peer-deps

# [BUILD] LAYER
FROM base AS build

WORKDIR /usr/app

COPY --from=base /usr/app/node_modules ./node_modules
COPY . .

RUN npm run build

# [PRODUCTION] LAYER
FROM node:19-alpine AS production

WORKDIR /usr/app

# COPY package*.json yarn.lock* ./
# COPY .yarn ./.yarn
# COPY .yarnrc.yml ./
COPY package*.json ./

# RUN yarn workspaces focus --all --production

RUN npm ci --only=production

COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/build ./build
COPY --from=build /usr/app/public ./public
COPY --from=build /usr/app/.next ./.next

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
