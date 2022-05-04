import create from "zustand";
import { devtools } from 'zustand/middleware'

import createAuthSlice from "./createAuthSlice";
import createChanllengeSlice from "./createChanllengeSlice";
import createChapterSlice from "./createChapterSlice";
import createDiffcultSlice from "./createDiffcultSlice";



const useStore = create(devtools((set, get) => ({
  ...createAuthSlice(set, get),
  ...createChapterSlice(set,get),
  ...createChanllengeSlice(set,get),
  ...createDiffcultSlice(set,get)
})));

export default useStore;
