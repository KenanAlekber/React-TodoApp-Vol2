import { TodosService } from "./Todo";

export const useService = () => {
    const services = {
        useTodosService: new TodosService()
    }

    return services
}