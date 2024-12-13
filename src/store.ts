import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the state shape
interface CounterState {
  apiKey?: string | null;
  setApiKey: (apiKey: string) => void;
}

// Create the store with persist middleware
const useStore = create<CounterState>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),
    }),
    {
      name: "my-app-store", // Key for localStorage
    }
  )
);

export default useStore;
