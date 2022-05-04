const createDiffcultSlice = (set, get) => ({
    difficults :[],
    updateDifficults: (difficults) => set({difficults})
  });
  
  export default createDiffcultSlice;
  