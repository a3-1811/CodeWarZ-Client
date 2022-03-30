const createAuthSlice = (set, get) => ({
    user :{},
    isLogin: () => {
     return localStorage.getItem('user') ? true : false
    },
    updateInfo: (user) => set({user})
  });
  
  export default createAuthSlice;
  