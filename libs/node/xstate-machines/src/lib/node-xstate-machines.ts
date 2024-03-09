import { createMachine, assign } from "xstate";

function getUsers() {
  return fetch("/api/users").then((r) => r.json());
}

// const myChildMachine = createMachine({
//   id: 'myChildMachines',
//   initial: 'active',
//   states: {
//     active: {},
//     not_active: {},
//   },
// });

interface ToggleMachineContext {
  count: number;
}

export const toggleMachine = createMachine<ToggleMachineContext>(
  {
    id: "toggle",
    initial: "inactive",
    context: {
      count: 0,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: "active",
            actions: assign({
              count: (context) => context.context.count + 1,
            }),
          },
        },
      },
      active: { on: { TOGGLE: "inactive" } },
    },
  },
  {
    services: {
      getUsers,
    },
  }
);

interface TestMachineContext {
  count: number;
  disabledCount: number;
}

export const testMachine = createMachine<TestMachineContext>({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0,
    disabledCount: 0,
  },
  states: {
    inactive: {
      entry: assign({ disabledCount: (ctx) => ctx.context.disabledCount + 1 }),
      on: { TOGGLE: "active" },
    },
    active: {
      entry: assign({ count: (ctx) => ctx.context.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});
