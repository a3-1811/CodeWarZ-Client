import axiosClient from "./axiosClient"

const baseUri = '/languages'

const LanguageApi = {
    getListLanguages(params){
        const url =baseUri + '/'
        return axiosClient.get(url, params)
    },

}

export default LanguageApi;