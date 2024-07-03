import { AuthStorageKeys } from "./enums/AuthStorageKeys";

const baseUrl = "http://localhost:5000/api/";

export type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export function handleRequest(
  method: RestMethod,
  path: string,
  body: any = null
): Promise<Response> {
  const request: any = {
    method: method.toUpperCase(),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
    },
  };
  if (body) {
    request.body = JSON.stringify(body);
  }
  return fetch(`${baseUrl}${path}`, request);
}
