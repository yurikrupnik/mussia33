// import styles from './App.module.css';
import { Routes, Route, Link } from "@solidjs/router";
import { lazy } from "solid-js";
// import "virtual:windi.css";

const About = lazy(() => import("./routes/about"));
const Users = lazy(() => import("./routes/users"));
const Home = lazy(() => import("./routes/home"));
const SecretManager = lazy(() => import("./routes/secretManager"));

const NotFound = () => {
  return <div>error</div>;
};

function App() {
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Welcome frontend-host</h1>
      <h1 class="text-3xl font-bold underline">Welcome frontend-solid-app</h1>
      <div>Hello dear user :)</div>
      {/*<Button>my mui button</Button>*/}
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/user">Users</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Users />} />
        <Route path="/about" element={<About />} />
        <Route path="/secret-manager" element={<SecretManager />} />
        <Route path="/*all" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
