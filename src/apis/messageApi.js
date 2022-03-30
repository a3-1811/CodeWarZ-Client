import axiosClient from "./axiosClient"

const MessageApi = {
    getCurrentConversation(params){
        const url ='/messages/'
        return axiosClient.get(url, {params})
    },
    createConversation(params){
        const url ='/messages/'
        return axiosClient.post(url,{...params})
    },
    createNewMessage(id,params){
        const url ='/messages/'+id
        return axiosClient.post(url,{...params})
    }
}

export default MessageApi;