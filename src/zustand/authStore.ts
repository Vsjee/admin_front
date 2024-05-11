import { persist } from 'zustand/middleware';
import { create } from 'zustand';

interface State {
  auth: boolean;
}

interface Actions {
  updateAuth: (authState: boolean) => void;
}

const INITIAL_STATE: State = {
  auth: false,
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      auth: INITIAL_STATE.auth,

      updateAuth: (authState: boolean) => {
        set(() => ({
          auth: authState,
        }));
      },
    }),
    {
      name: 'auth_data',
    }
  )
);
