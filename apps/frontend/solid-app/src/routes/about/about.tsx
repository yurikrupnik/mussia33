import { useMachine } from '@xstate/solid';
import { createMachine } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

const Toggler = () => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onclick={() => send({ type: 'TOGGLE' })}>
      {state.value === 'inactive'
        ? 'Click to activate'
        : 'Active! Click to deactivate'}
    </button>
  );
};
const About = () => {
  return (
    <div>
      About
      <div>
        <Toggler />
      </div>
    </div>
  );
};

export default About;
