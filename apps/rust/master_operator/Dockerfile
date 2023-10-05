FROM messense/rust-musl-cross:x86_64-musl AS builder
WORKDIR /app
COPY Cargo.toml .
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM scratch AS rust
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/rust_master_operator /app
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT ["/app"]
