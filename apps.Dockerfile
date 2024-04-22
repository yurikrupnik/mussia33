
# Done!
FROM docker.io/node:lts-alpine AS node
WORKDIR /app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
ENV NODE_ENV=$NODE_ENV
COPY ./$DIST_PATH .
RUN npm install
ENV PORT=8080
RUN chown -R node:node .
#USER node
USER nonroot:nonroot
EXPOSE ${ PORT}
CMD ["node", "main.js"]

# Done
FROM nginx:alpine AS nginx
WORKDIR /app
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY ./$DIST_PATH /usr/share/nginx/html
USER nonroot:nonroot
ENV PORT=80
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]

# Done
FROM scratch AS scratch
WORKDIR /
ARG DIST_PATH
ENV PORT=8080
COPY $DIST_PATH ./app
USER nonroot:nonroot
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
USER nonroot:nonroot
EXPOSE ${PORT}
ENTRYPOINT ["/app"]

FROM denoland/deno:alpine AS deno
WORKDIR /app
USER deno
ARG DIST_PATH
RUN test -n "$DIST_PATH" || (echo "DIST_PATH not set" && false)
COPY $DIST_PATH .
USER nonroot:nonroot
ENV PORT=8080
EXPOSE ${PORT}
CMD ["run", "--allow-net", "--allow-env", "main.js"]

# TODO check why this way it's 10.9GB vs 21.9MB
#FROM messense/rust-musl-cross:x86_64-musl AS builder
#WORKDIR /
#ARG APP_NAME
#COPY ./Cargo.toml .
#COPY ./Cargo.lock .
#COPY ./nx.json .
#COPY ./apps/rust ./apps/rust
#COPY ./libs/rust ./libs/rust
#RUN cargo build --release -p $APP_NAME --target x86_64-unknown-linux-musl
#
#FROM scratch AS rust
#ARG APP_NAME
#COPY --from=builder /target/x86_64-unknown-linux-musl/release/$APP_NAME  /app
#ENV PORT=8080
#EXPOSE ${PORT}
#ENTRYPOINT ["/app"]
