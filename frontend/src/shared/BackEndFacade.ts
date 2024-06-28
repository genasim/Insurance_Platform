import {AuthStorageKeys} from "./enums/AuthStorageKeys";
import toast from "react-hot-toast";

const address = "http://localhost:5000"

//ToDo auth toaster if not valid token
export function handleRequest(method: string, path: string, body: any = null): Promise<Response> {
    const request : any = {
        method: method.toUpperCase(),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
        }
    };
    if (body) {
        request.body = JSON.stringify(body);
    }

    return fetch(`${address}${path}`, request).then(resp => {
        if (resp.status >= 400) {
            return resp.json().then(data => {
                toast.error(data.message);
                throw new Error(resp.statusText);
            });
        }

        return resp;
    })
}
