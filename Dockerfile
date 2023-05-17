
FROM docker.io/node:lts-alpine as node-deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
WORKDIR /usr/src/app
COPY ./$DIST_PATH/package*.json .
RUN npm install --only=production

# Production image, copy all the files and run nest
FROM docker.io/node:lts-alpine as node-new
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 8080
#RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
WORKDIR /usr/src/app
COPY --from=node-deps /usr/src/app/node_modules ./node_modules
COPY --from=node-deps /usr/src/app/package.json ./package.json
COPY ./$DIST_PATH .
RUN chown -R node:node .
USER node
EXPOSE ${PORT}
CMD ["dumb-init", "node", "main.js"]


# Done!
FROM docker.io/node:lts-alpine AS node
WORKDIR /app
#COPY _proto ./app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ENV NODE_ENV=$NODE_ENV
COPY ./$DIST_PATH .
RUN npm install
ENV PORT=8080
RUN chown -R node:node .
USER node
EXPOSE ${PORT}
CMD ["node", "main.js"]

# Done
FROM nginx:alpine AS nginx
WORKDIR /app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY ./$DIST_PATH /usr/share/nginx/html
ENV PORT=80
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]

# Done
FROM scratch AS scratch
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ARG ENTRY_NAME=app
ENV PORT=8080
COPY $DIST_PATH ./app
EXPOSE ${PORT}
ENTRYPOINT ["/app"]

# Done
FROM alpine AS alpine
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ARG ENTRY_NAME=app
ENV PORT=8080
COPY $DIST_PATH ./app
EXPOSE ${PORT}
ENTRYPOINT ["/app"]

FROM denoland/deno:alpine AS deno
WORKDIR /app
USER deno
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY $DIST_PATH .
ENV PORT=8080
EXPOSE ${PORT}
CMD ["run", "--allow-net", "--allow-env", "main.js"]

FROM debian:buster-slim AS rust
WORKDIR /
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY $DIST_PATH /bin/app
ENV PORT=8080
EXPOSE ${PORT}
CMD app
