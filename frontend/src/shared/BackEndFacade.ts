import {AuthStorageKeys} from "./enums/AuthStorageKeys";

const address = "localhost:5000"

export function handleRequest(path: string, method: string, body: any) : Promise<Response> {
    return fetch(`${address}${path}`, {
        method: method.toUpperCase(),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
        },
        body: JSON.stringify(body),
    });
}
