import axios from "axios"

export class HttpClient {
    baseUrl;
    constructor(url) {
        this.baseUrl = url
    }

    async get(endPoint) {
        return await axios.get(`${this.baseUrl}/${endPoint}`)
    }

    async post(endPoint, body) {
        return await axios.post(`${this.baseUrl}/${endPoint}`, body)

    }

    async put(endPoint, body) {
        return await axios.put(`${this.baseUrl}/${endPoint}`, body)

    }

    async delete(endPoint) {
        return await axios.delete(`${this.baseUrl}/${endPoint}`)

    }
}