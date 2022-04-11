import axiosClient from "./axiosClient"

const ChanllengeApi = {
    getChanllenges(params){
        const url ='/chanllenges/'
        return axiosClient.get(url, {params})
    },
    createNewChanllenge(params){
        const url="/chanllenges/"
        return axiosClient.post(url,params)
    },
    getCodeMyChallenges(id){
        const url="/chanllenges/myCodeChanllenges/"+id
        return axiosClient.get(url)
    },
    getChanllengeById(id){
        const url="/chanllenges/"+id
        return axiosClient.get(url)
    },
    deleteChanllenge(id){
        const url="/chanllenges/"+id
        return axiosClient.delete(url)
    },
    updateChanllenge(id,params){
        const url="/chanllenges/"+id
        return axiosClient.patch(url,{...params})
    },
    commentChallenge(id,params){
        const url="/chanllenges/"+id+"/comment"
        return axiosClient.post(url,params)
    }
}

export default ChanllengeApi;