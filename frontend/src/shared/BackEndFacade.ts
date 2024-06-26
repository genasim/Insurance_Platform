import {AuthStorageKeys} from "./enums/AuthStorageKeys";
import toast from "react-hot-toast";

const address = "http://localhost:5000"

export function handleRequest(method: string, path: string, body: any): Promise<Response> {
    return fetch(`${address}${path}`, {
        method: method.toUpperCase(),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
        },
        body: JSON.stringify(body),
    }).then(resp => {
        if (resp.status >= 400) {
            return resp.json().then(data => {
                toast.error(data.message);
                throw new Error(resp.statusText);
            });
        }

        return resp;
    })
}
