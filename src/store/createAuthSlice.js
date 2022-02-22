const createAuthSlice = (set, get) => ({
    user :{},
    isLogin: () => {
     return localStorage.getItem('user') ? true : false
    },
  });
  
  export default createAuthSlice;
  