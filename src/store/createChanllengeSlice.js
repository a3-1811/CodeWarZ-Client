const createChanllengeSlice = (set, get) => ({
    chanllenges :[],
    updateChanllenges: (chanllenges) => set({chanllenges})
  });
  
  export default createChanllengeSlice;
  