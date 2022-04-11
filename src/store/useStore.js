import create from "zustand";
import { devtools } from 'zustand/middleware'

import createAuthSlice from "./createAuthSlice";
import createChapterSlice from "./createChapterSlice";


const useStore = create(devtools((set, get) => ({
  ...createAuthSlice(set, get),
  ...createChapterSlice(set,get)
})));

export default useStore;
