import axiosClient from "./axiosClient"

const ProjectApi = {
    getCurrentProjects(params){
        const url ='/projects/'
        return axiosClient.get(url, {params})
    },
    getProjectById(projectId){
        const url ='/projects/'+projectId
        return axiosClient.get(url)
    },
    getTaskByProjectId(projectId){
        const url ='/projects/tasks/'+projectId
        return axiosClient.get(url)
    },
    createNewProject(params){
        const url = '/projects/'
        return axiosClient.post(url,params)
    },
    addNewMember(params){
        console.log(params)
        const url = '/projects/'+params.projectId+"/joinRequest?email="+params.email
        return axiosClient.post(url)
    }
}

export default ProjectApi;