FROM messense/rust-musl-cross:x86_64-musl AS builder
WORKDIR /app
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM scratch AS rust
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/first-rust-app /app
ENV PORT=8080
EXPOSE ${PORT}
ENTRYPOINT ["/app"]
