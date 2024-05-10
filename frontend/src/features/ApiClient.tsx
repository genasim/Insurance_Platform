import { IdType, Identifiable } from "./shared-types";
import {User} from "./User";

export class ApiClient {
    constructor(private baseUrl: string) { }

    create<V extends Identifiable<IdType>>(table: string, entity: Omit<V, 'id'>): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${table.toLocaleLowerCase()}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entity)
        });
    }

    findById<V extends Identifiable<IdType>>(table: string, id: IdType): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${table.toLocaleLowerCase()}/${id}`);
    }

    findAll(table: string): Promise<Array<User>>  {
        return this.fetchData(`${this.baseUrl}/${table}`)
    }

    private async fetchData<D>(uri: string, options?: RequestInit): Promise<D> {
        const resp = await fetch(uri, options);
        if(resp.status >= 400) {
            throw new Error(await resp.text());
        }
        return resp.json();
    }
}

const API = new ApiClient("http://localhost:9000"); // Singleton

export default API;
