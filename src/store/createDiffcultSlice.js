const createDiffcultSlice = (set, get) => ({
    difficults :[],
    updateDifficults: (difficults) => set({difficults}),
    addDifficults: (difficult) => {
      let temp = [...get().difficults]
      set({difficults : [...temp,difficult]})
    },
    updateDifficult: (id,diffcult) => {
      let temp = [...get().difficults]
      let index = temp.findIndex(item=>item._id === id)
      if(index != -1){
        temp[index] = {...diffcult}
        set({difficults : temp})
      }
  },
  });
  
  export default createDiffcultSlice;
  