import instance from "../../request";
import { createResource, For, createSignal } from "solid-js";
import { User } from "@mussia33/node/nest/users-api";

async function getUsers() {
  return instance.get<User[]>("/api/users").then((r) => r.data);
}

interface Props {
  name?: string;
}
const Hello = (props: Props) => {
  const classes = "text-3xl font-bold underline";
  return <div class={classes}>Hello from {props.name}!!</div>;
};

const Shit = () => {
  const [data, { refetch }] = createResource<User[]>(getUsers, {
    initialValue: [],
  });
  const [name, setName] = createSignal("Yuri");
  return (
    <div>
      <Hello name={name()} />
      <button onclick={() => setName("Meir")}>Set State to Meir</button>
      <For each={data()}>
        {(item) => {
          return (
            <div class="flex items-stretch">
              <div class="py-6 w-full">{item.name}</div>
              <div class="py-6 w-full">{item.email}</div>
              <div class="py-6 w-full">{item.tenantId}</div>
              <button>Delete</button>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default Shit;
