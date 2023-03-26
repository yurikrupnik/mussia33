import { For, createResource } from "solid-js";
import axios from "axios";
import { useMachine } from "@xstate/solid";
import { testMachine } from "@mussia33/node/xstate-machines";
// import { User, UserDocument } from '@nx-go-playground/api/users';

function getUsers() {
  return axios.get("/api/users").then((r: any) => r.data);
  // return axios.get('http://localhost:8080/api/users').then((r: any) => r.data);
}
function deleteUser(id: string) {
  return axios.delete(`/api/users/${id}`);
}

const Users = () => {
  const [state, send] = useMachine(testMachine);
  // const [data, setData] = createSignal([]);
  const [data, { refetch }] = createResource(getUsers, { initialValue: [] });

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
        data here
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
      </div>
    </div>
  );
};

export default Users;
