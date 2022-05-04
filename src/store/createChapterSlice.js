import UserApi from "../apis/userApi";

const createChapterSlice = (set, get) => ({
    chapters :[],
    updateChapter: (index,chapter) => {
        let temp = [...get().chapters]
        temp[index] = {...chapter}
        set({chapters : temp})
    },
    fetchMyChapters: async () => {
        let {chapters} = await UserApi.getMyChapters()
        set({ chapters})
      },
    getChapterByIndex: (index)=>{
        return get().chapters.length === 0 ? [] : get().chapters[index].chapter
    }
  });
  
  export default createChapterSlice;
  