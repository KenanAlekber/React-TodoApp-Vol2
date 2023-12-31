import { HttpClient } from "../HTTPClient";

export class TodosService extends HttpClient {
    constructor() {
        super("https://jsonplaceholder.typicode.com")
    }

    async getAllTodos() {
        return await this.get(`posts`)
    }

    async createNewTodos(body) {
        return await this.post(`posts`, body)
    }

    async updateTodosById(id, body) {
        return await this.put(`posts/${id}`, body)
    }

    async deleteTodosById(id) {
        return await this.delete(`posts/${id}`)
    }
}