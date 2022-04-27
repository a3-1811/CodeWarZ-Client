import axiosClient from "./axiosClient"

const baseUri = '/battles'

const BattleApi = {
    getListBattle(params){
        const url =baseUri + '/'
        return axiosClient.get(url, params)
    },
    addNewBattle(params){
        const url =baseUri + '/'
        return axiosClient.post(url, params)
    }

}

export default BattleApi;