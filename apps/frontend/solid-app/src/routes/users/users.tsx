import { For, createResource } from "solid-js";
import { useMachine } from "@xstate/solid";
import { testMachine } from "@mussia33/node/xstate-machines";
// import { users } from "@mussia33/node/grpc"; // does not affect
import { User } from "@mussia33/node/nest/users-api"; // does not affect
import instance from "../../request";

function getUsers() {
  return instance.get<User[]>("/api/users").then((r: any) => r.data);
}

function getUsersRust() {
  return instance.get<User[]>("/api-r/users").then((r: any) => r.data);
}

function getUsersGo() {
  return instance.get<User[]>("/api-g/users").then((r: any) => r.data);
}

function getUsersRedis() {
  return instance.get("/api/redis-users").then((r: any) => r.data);
}

function getUsersGrpc() {
  return instance.get("/api/grpc-users").then((r: any) => r.data);
}

function deleteUser(id: string) {
  return instance.delete(`/api/users/${id}`);
}

const Users = () => {
  const [state, send] = useMachine(testMachine);
  // const [data, setData] = createSignal([]);
  const [redisData] = createResource(getUsersRedis, {
    initialValue: [],
  });
  const [grpcData] = createResource(getUsersGrpc, {
    initialValue: [],
  });
  const [data, { refetch }] = createResource<User[]>(getUsers, {
    initialValue: [],
  });

  const [rustData] = createResource(getUsersRust, {
    initialValue: [],
  });

  const [goData] = createResource(getUsersGo, {
    initialValue: [],
  });

  const deleteItem = (id: string) => {
    deleteUser(id).then(() => {
      refetch();
    });
  };
  return (
    <div>
      <h1 class="text-3xl font-bold underline">Users</h1>
      <button onClick={() => send("TOGGLE")}>
        Click me ({state.matches("active") ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{state.context.count}</strong> times
      </code>
      <div>
        <h1>Rust data</h1>
        <For each={rustData()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
        <h1>Go data</h1>
        <For each={goData()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
        <h1>Node data</h1>
        <For each={data()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
        <h1>Redis data</h1>
        <For each={redisData()}>
          {(item: any) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
        <h1>GRPC data</h1>
        <For each={grpcData()}>
          {(item) => {
            return (
              <div class="flex items-stretch">
                <div class="py-6 w-full">{item.name}</div>
                <div class="py-6 w-full">{item.email}</div>
                <div class="py-6 w-full">
                  <button onclick={() => deleteItem(item._id)}>Delete</button>
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default Users;
