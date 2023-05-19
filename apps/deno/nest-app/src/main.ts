import { Application, Router } from "https://deno.land/x/oak/mod.ts";
// import { swaggerDoc } from "https://deno.land/x/deno_swagger_doc/mod.ts";

const books = new Map();

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = "books";
  })
  .get("/book/:id", (context) => {
    if (books.has(context?.params?.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

// const swaggerDefinition = {
//   info: {
//     title: "Hello World", // Title (required)
//     version: "1.0.0", // Version (required)
//     description: "A sample API", // Description (optional)
//   },
//   host: `localhost:8080`, // Host (optional)
//   basePath: "/api", // Base path (optional)
//   swagger: "2.0", // Swagger version (optional)
// };
//
// const options = {
//   swaggerDefinition,
//   // Path to the API docs
//   // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
//   api: [],
//   // apis: ["./example/v2/routes.ts", "./example/v2/**/*.yaml"],
// };

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
// const swaggerSpec = swaggerDoc(options);

const app = new Application();

// app.use(async (context, next) => {
//   if (context.request.url.pathname === "/swagger.json") {
//     context.response.headers.set("Content-Type", "application/json");
//     context.response.status = 200;
//     context.response.body = swaggerSpec;
//   } else {
//     await next();
//   }
// });
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

// Hello World!
// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

const port = Number(Deno.env.get("PORT") || 8080);

console.log(`Listening on http://localhost:${port}`);
await app.listen({ port });
