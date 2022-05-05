import axiosClient from "./axiosClient"

const baseUri = '/difficults'

const DifficultApi = {
    getListDifficult(params){
        const url =baseUri + '/'
        return axiosClient.get(url, params)
    },
    addDifficult(params){
        const url =baseUri + '/'
        return axiosClient.post(url, params)
    }
    ,
    updateDifficult(id,name){
        const url =baseUri + '/'+id
        return axiosClient.patch(url, {name})
    }
}

export default DifficultApi;