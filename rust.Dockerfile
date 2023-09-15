FROM messense/rust-musl-cross:x86_64-musl AS builder
WORKDIR /
ARG APP_NAME
COPY ./Cargo.toml .
COPY ./Cargo.lock .
COPY ./nx.json .
#COPY ./apps/rust/actix_app ./apps/rust/actix_app
COPY ./apps/rust ./apps/rust
COPY ./libs/rust ./libs/rust
RUN cargo build --release -p $APP_NAME --target x86_64-unknown-linux-musl

FROM scratch AS rust
ARG APP_NAME
COPY --from=builder /target/x86_64-unknown-linux-musl/release/$APP_NAME  /app
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT ["/app"]
