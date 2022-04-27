import axiosClient from "./axiosClient"

const CodeApi = {
    execute(params){
        const url ='/code/execute'
        return axiosClient.post(url, {...params})
    },
    run(params){
        const url ='/code/run'
        return axiosClient.post(url, {...params})
    },
    submitBattle(params){
        const url ='/code/submitBattle'
        return axiosClient.post(url, {...params})
    },
    submit(params){
        const url ='/code/submit'
        return axiosClient.post(url, {...params})
    }
}

export default CodeApi;