import axios from 'axios'
import queryString from 'query-string'
import {SERVER_URL} from '@env'

const axiosClient = {
    
    application : axios.create({
        baseURL: SERVER_URL,
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    applicationNoAuth : axios.create({
        baseURL: SERVER_URL,
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    }),

    formData : axios.create({
        baseURL: SERVER_URL,
        headers: {
            'content-type': 'multipart/form-data',
        },
    })
}


export default axiosClient;