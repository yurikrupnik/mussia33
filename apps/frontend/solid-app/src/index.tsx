import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./App";
// import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
// fails with vite
// const queryClient = new QueryClient()

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
