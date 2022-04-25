import axiosClient from "./axiosClient"

const NotificationApi = {
    getNotifications(params){
        const url ='/notifications/'
        return axiosClient.get(url, {params})
    },
    createNotification(params){
        const url ='/notifications/'
        return axiosClient.post(url,{...params})
    },
    deleteNotification(id,params){
        const url ='/notifications/'+id
        return axiosClient.post(url,{...params})
    },
    getInviteRequest(){
        const url ='/inviteRequest/'
        return axiosClient.get(url)
    }
}

export default NotificationApi;