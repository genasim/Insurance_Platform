import { IdType, Identifiable } from "./shared-types";
import {User} from "./User";

export class ApiClient {
    constructor(private baseUrl: string) { }

    findById<V extends Identifiable<IdType>>(entity: string, id: IdType): Promise<V>  {
        return this.fetchData(`${this.baseUrl}/${entity.toLocaleLowerCase()}/${id}`);
    }

    findByName(entity: string, name: string): Promise<Array<User>>  {
        return this.fetchData(`${this.baseUrl}/${entity}`)
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
