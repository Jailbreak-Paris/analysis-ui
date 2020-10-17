# Base ───────────────────────────────────────────────────────────────────────
FROM node:12-alpine as base

WORKDIR /opt/app

ENV PATH /opt/app/node_modules/.bin:$PATH

# Build ──────────────────────────────────────────────────────────────────────
FROM base as build

# Assume proper .dockerignore
COPY . /opt/app

# Skip installing devDependencies
ENV NODE_ENV=production 
RUN yarn install --production

# Overwrite the default next.config.js
COPY ./docker/next.config.js /opt/app
RUN yarn next build 

# Compile with ncc
COPY ./docker/next-start.js /opt/app
RUN yarn add @vercel/ncc
RUN yarn run ncc build -m ./next-start.js

# Pkg into a binary
RUN yarn add pkg
RUN yarn run pkg -t host dist/index.js -o next-start

# Service ────────────────────────────────────────────────────────────────────
FROM alpine

WORKDIR /opt/app
ENV NODE_ENV=production
ENV PORT=8080

RUN apk update && \
  apk add --no-cache libstdc++ libgcc ca-certificates && \
  rm -rf /var/cache/apk/*

COPY --from=build /opt/app/next.config.js .
COPY --from=build /opt/app/next-start .
COPY --from=build /opt/app/.next .next
COPY --from=build /opt/app/public public

RUN addgroup -g 1001 -S nodejs 
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "./next-start", "-p", "$PORT" ]