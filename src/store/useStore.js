import create from "zustand";

import createAuthSlice from "./createAuthSlice";

const useStore = create((set, get) => ({
  ...createAuthSlice(set, get),
}));

export default useStore;
