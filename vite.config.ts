import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [solidPlugin()],
    define: {
      VITE_APP_ENV: env.VITE_APP_ENV,
      VITE_HOST: env.VITE_HOST,
      VITE_SHIT: env.VITE_SHIT,
    },
  };
});
