import { AuthStorageKeys } from "./enums/AuthStorageKeys";

const baseUrl = "http://localhost:5000/api";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export function handleRequest(
  method: HttpMethod,
  path: string,
  data?: {
    params?: any;
    payload?: any;
  }
): Promise<Response> {
  const request: any = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
    },
  };
  let encodedPath = baseUrl + path.replace(/:([a-zA-Z]+)/g, (_, key) =>
    encodeURIComponent(data?.params[key])
  );

  if (data?.payload) {
    if (method === "GET" || method === "DELETE") {
      const url = new URL(encodedPath);
      Object.entries(data.payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
      encodedPath = url.toString();
    } else {
      request.body = JSON.stringify(data.payload);
    }
  }
  return fetch(encodedPath, request);
}
