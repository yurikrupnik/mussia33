FROM messense/rust-musl-cross:x86_64-musl AS builder
WORKDIR /app
COPY Cargo.toml .
COPY . .

#RUN apt-get update && apt-get install -y \
#    pkg-config \
#    libssl-dev
#
#ENV OPENSSL_STATIC=1
#ENV OPENSSL_DIR=/usr

RUN cargo build --release --target x86_64-unknown-linux-musl
FROM scratch AS rust
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/rust_master_operator /app
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT ["/app"]
