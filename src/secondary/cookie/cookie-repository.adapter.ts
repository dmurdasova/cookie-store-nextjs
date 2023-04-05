import { ICookie } from '@domain/entities';
import { ICookieFilter, ICookieRepository } from '@domain/ports';

const BASE_URL = process.env.REACT_APP_API;
const API_URL = `${BASE_URL}/cookies`;

const repository: ICookieRepository = {
    get: async (request: ICookieFilter): Promise<readonly ICookie[]> => {
        const query = [];

        if (request.term) {
            query.push(`title_like=${request.term}`);
        }

        query.push(`_order=${request.sortOrder}`);

        if (request.sortType !== 'none') {
            query.push(`_sort=${request.sortType}`);
        }

        const url = `${API_URL}?${query.join('&')}`;

        const response = await fetch(url);
        const data = await response.json();

        if (request.selectedToppings.length) {
            const set = new Set([...request.selectedToppings]);

            return data.filter((cookie: ICookie) => {
                return cookie.toppings?.some((id) => set.has(id));
            });
        }
        return data;
    }
};

export function useCookieRepositoryService(): ICookieRepository {
    return repository;
}
