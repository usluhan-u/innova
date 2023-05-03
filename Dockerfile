FROM node:18.8-alpine as base

# 1. Install dependencies
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./

RUN yarn set version berry

COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN \
  if [ -f yarn.lock ]; then yarn install; \
  elif [ -f package-lock.json ]; then npm install; \
  else echo "Lockfile not found."; \
  fi

COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found."; \
  fi

FROM base AS runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=payload.config.js

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* ./

RUN yarn set version berry

COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN \
  if [ -f yarn.lock ]; then yarn workspaces focus --all --production; \
  elif [ -f package-lock.json ]; then npm install --production; \
  else yarn build; \
  fi

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "server.js"]
