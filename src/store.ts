import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the state shape
interface CounterState {
  apiKey?: string | null;
  setApiKey: (apiKey: string) => void;

  trackingData: Record<
    string,
    {
      value: number;
      description: string;
      key: string;
      dateString: string;
    }[]
  >;

  setTrackingData: (
    dateIso: string,
    key: string,
    value: number,
    description: string,
    dateString: string
  ) => void;
}

// Create the store with persist middleware
const useStore = create<CounterState>()(
  persist(
    (set) => ({
      apiKey: null,
      setApiKey: (apiKey) => set({ apiKey }),

      trackingData: {},
      setTrackingData: (dateIsoKey, key, value, description, dateString) =>
        set((state) => {
          const currentDayData = state.trackingData[dateIsoKey] || [];
          const updatedDayData = [
            ...currentDayData,
            {
              key,
              value,
              description,
              dateString,
            },
          ];

          return {
            trackingData: {
              ...state.trackingData,
              [dateIsoKey]: updatedDayData,
            },
          };
        }),
    }),
    {
      name: "my-app-store", // Key for localStorage
    }
  )
);

export default useStore;
