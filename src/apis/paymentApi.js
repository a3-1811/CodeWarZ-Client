import axiosClient from "./axiosClient"

const baseUri = '/payments'

const PaymentApi = {
    createPaymentUrl(params){
        const url =baseUri + '/create_payment_url'
        return axiosClient.post(url, params)
    },
    addPaymentInfo(params){
        const url =baseUri + '/'
        return axiosClient.post(url, params)
    },
    getListPayment(){
        const url =baseUri + '/'
        return axiosClient.get(url)
    }
}

export default PaymentApi;