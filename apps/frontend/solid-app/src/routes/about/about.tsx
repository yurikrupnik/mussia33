import { useMachine } from "@xstate/solid";
import { createMachine } from "xstate";
import instance from "../../request";
import { User } from "@mussia33/node/nest/users-api";
import { createResource, For } from "solid-js";

function getUsers() {
  return instance.get<User[]>("/api/users").then((r: any) => r.data);
}

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      on: { TOGGLE: "inactive" },
    },
  },
});

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onclick={() => send({ type: "TOGGLE" })}>
      {state.value === "inactive"
        ? "Click to activate"
        : "Active! Click to deactivate"}
    </button>
  );
};
const About = () => {
  const [data, { refetch }] = createResource<User[]>(getUsers, {
    initialValue: [],
  });
  return (
    <div>
      About
      <h1>Node data</h1>
      <For each={data()}>
        {(item: any) => {
          return (
            <div class="flex items-stretch">
              <div class="py-6 w-full">{item.name}</div>
              <div class="py-6 w-full">{item.email}</div>
            </div>
          );
        }}
      </For>
      <div>
        <Toggler />
      </div>
    </div>
  );
};

export default About;
