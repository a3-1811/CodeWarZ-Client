import axiosClient from "./axiosClient"

const baseUri = '/payments'

const PaymentApi = {
    createPaymentUrl(params){
        const url =baseUri + '/create_payment_url'
        return axiosClient.post(url, params)
    }
}

export default PaymentApi;