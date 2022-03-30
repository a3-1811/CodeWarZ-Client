import create from "zustand";
import { devtools } from 'zustand/middleware'

import createAuthSlice from "./createAuthSlice";

const useStore = create(devtools((set, get) => ({
  ...createAuthSlice(set, get),
})));

export default useStore;
