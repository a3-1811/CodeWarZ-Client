import axiosClient from "./axiosClient"

const TaskApi = {
    getCurrentTasks(params){
        const url ='/tasks/'
        return axiosClient.get(url, {params})
    },
    updateTask(taskId,params){
        const url ='/tasks/'+taskId
        return axiosClient.patch(url,{...params})
    },
    createTask(projectId,params){
        const url ='/tasks/'+ projectId
        return axiosClient.post(url,{...params})
    },
    addNewMember(taskId,params){
        const url ='/tasks/'+ taskId+'/addMember'
        return axiosClient.post(url,{...params})
    },
    deleteTask(taskId){
        const url ='/tasks/'+ taskId
        return axiosClient.delete(url)
    }
}

export default TaskApi;