import Axios from "axios"
import axiosClient from "./axiosClient"

const baseUri = '/users'

const UserApi = {
    registerAccount(params){
        const url =baseUri + '/'
        return axiosClient.post(url, params)
    },
    loginAccount(params){
        const url =baseUri + '/login'
        return axiosClient.post(url, params)
    },
    loginAccountWithGoogle(params){
        const url =baseUri + '/login/google'
        return axiosClient.post(url, params)
    },
    loginAccountWithGithub(params){
        const url =baseUri + '/login/github'
        return axiosClient.post(url, params)
    },
    resetPassword(params){
        const url =baseUri + '/resetPassword'
        return axiosClient.post(url, params)
    },
    confirmPassword(params){
        const url =baseUri + '/confirmNewPassword'
        return axiosClient.post(url, params)
    },
    getProfile(params){
        const url =baseUri + '/me'
        return axiosClient.get(url,params)
    },
    getMyRecord(params){
        const url =baseUri + '/my-record'
        return axiosClient.get(url,params)
    },
    getMyChapters(params){
        const url =baseUri + '/myChapters'
        return axiosClient.get(url,params)
    },
    
    getListUser(params){
        const url =baseUri
        return axiosClient.get(url,params)
    },
    logout(params){
        const url =baseUri+'/logout'
        return axiosClient.post(url,params)
    },
    logoutAll(params){
        const url =baseUri+'/logoutAll'
        return axiosClient.post(url,params)
    },
    checkAuthen(params){
        const url =baseUri+'/me'
        return axiosClient.get(url,params)
    },
    inviteFriends(params){
        const url =baseUri+'/invite-friends'
        return axiosClient.post(url,params)
    },
    ranking(params){
        const url =baseUri+'/ranking'
        return axiosClient.get(url,params)
    },
    acceptInvite(params){
        const url =baseUri+'/accept-invite'
        return axiosClient.post(url,params)
    },
    updateProfile(params){
        const url =baseUri+'/me'
        return axiosClient.patch(url,{...params})
    },
    unlockChapter(chapterID,params){
        const url =baseUri+'/unlock-chapter/'+chapterID
        return axiosClient.post(url,params)
    },
    generateChapters(params){
        const url =baseUri+'/generateChapters/'
        return axiosClient.post(url,params)
    },
    updateAvatar(mutilpart){
        const url =baseUri+'/me/avatar'
        let token = localStorage.getItem('tokenAuth')
        return Axios.post(`${process.env.REACT_APP_API_URL}${url}`,mutilpart,{
            headers:{
                "Authorization" : `Bearer ${token}`
            },
        })
    },
    manager(){
        const url ='/managers/'
        return axiosClient.get(url)
    }

}

export default UserApi;