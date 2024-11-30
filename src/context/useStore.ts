import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";

interface StoreProps {
    // Define the properties of the store
}

export const useStore = create(persist<StoreProps>((set) => ({}), {
    name: "store",
    storage: createJSONStorage(() => localStorage)
}));
