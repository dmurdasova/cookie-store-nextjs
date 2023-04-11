import { ITopping } from '@domain/entities';
import { IToppingRepository } from '@domain/ports';

let cache: readonly ITopping[] | null = null;

const BASE_URL = process.env.REACT_APP_API;
const API_URL = `${BASE_URL}/toppings`;

const repository: IToppingRepository = {
    get: async (): Promise<readonly ITopping[]> => {
        if (cache) {
            return Promise.resolve(cache);
        }

        console.log(process.env)

        console.log(API_URL);

        const response = await fetch(API_URL);
        const data = await response.json();

        cache = data;

        return data;
    }
};

export function useToppingRepositoryService(): IToppingRepository {
    return repository;
}
