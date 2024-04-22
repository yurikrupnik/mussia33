FROM messense/rust-musl-cross:x86_64-musl AS builder
WORKDIR /
ARG APP_NAME
COPY ./nx.json .
RUN --mount=type=bind,source=apps/rust,target=apps/rust \
    --mount=type=bind,source=libs/rust,target=libs/rust \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=./dist/target
RUN cargo install cargo-chef
#    --mount=type=cache,target=/root/.cargo/registry \
#    --mount=type=cache,target=/root/.cargo/git \
RUN cargo build --release -p $APP_NAME --target x86_64-unknown-linux-musl
#COPY ./Cargo.toml .
#COPY ./Cargo.lock .
#COPY ./apps/rust ./apps/rust
#COPY ./libs/rust ./libs/rust
RUN cargo build --release -p $APP_NAME --target x86_64-unknown-linux-musl

FROM scratch AS rust
ARG APP_NAME
COPY --from=builder /target/x86_64-unknown-linux-musl/release/$APP_NAME  /app
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT ["/app"]
