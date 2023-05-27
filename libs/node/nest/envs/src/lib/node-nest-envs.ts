export const mongoConfig = () => ({
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/mussia33",
});

export const redisConfig = () => ({
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
});
