import { useContext } from "react";
import toast from "react-hot-toast";
import { handleRequest, HttpMethod } from "../handle-request";
import { ModalContext } from "../layout/Layout";

type ApiErrorsResponse = {
  message?: string;
  error?: any;
};

export enum Services {
  LoginUser = "login-user",
  GetUser = "get-user-id",
  CreateUser = "post-user",
  UpdateUser = "put-user",
  DeleteUser = "delete-user-id",
  GetAllUsers = "get-users",
}

type Keys = Record<Services, {
  response: any;
  method: HttpMethod;
  payload: any | undefined;
  params: any | undefined;
}>;

interface BaseRequest extends Keys {
  [Services.GetUser]: {
    response: { userId: number };
    method: "GET";
    payload: undefined;
    params: undefined;
  };
  [Services.CreateUser]: {
    response: { name: string; email: string };
    method: "POST";
    payload: { name: string; email: string };
    params: undefined;
  };
  [Services.UpdateUser]: {
    response: { userId: number; name?: string; email?: string };
    method: "PUT";
    payload: { userId: number; name?: string; email?: string };
    params: undefined;
  };
  [Services.DeleteUser]: {
    response: { userId: number };
    method: "DELETE";
    payload: undefined;
    params: undefined;
  };
  [Services.GetAllUsers]: {
    response: { userId: number }[];
    method: "GET";
    payload: undefined;
    params: { page: number; size: number };
  };
  [Services.LoginUser]: {
    response: { token: string };
    method: "POST";
    payload: { email: string, password: string };
    params: undefined;
  }
}

type Requests = { [K in Services]: BaseRequest[K] };
type RequestMethods = { [K in Services]: BaseRequest[K]["method"] };
type RequestPayload = { [K in Services]: BaseRequest[K]["payload"] };
type RequestParams = { [K in Services]: BaseRequest[K]["params"] };
type RequestResponses = { [K in Services]: BaseRequest[K]["response"] };

const configs: {
  [K in Services]: { method: RequestMethods[K]; path: string };
} = {
  [Services.GetUser]: { method: "GET", path: "/users/:userId" },
  [Services.CreateUser]: { method: "POST", path: "/users" },
  [Services.UpdateUser]: { method: "PUT", path: "/users/:userId" },
  [Services.DeleteUser]: { method: "DELETE", path: "/users/:userId" },
  [Services.GetAllUsers]: { method: "GET", path: "/users" },
  [Services.LoginUser]: { method: "POST", path: "/auth/login"}
};

export default function useService<E extends Services>(
  service: E,
  successMsg?: string
): E extends keyof Requests
  ? RequestParams[E] extends undefined
    ? RequestPayload[E] extends undefined
      ? () => Promise<RequestResponses[E]>
      : (payload: RequestPayload[E]) => Promise<RequestResponses[E]>
    : RequestPayload[E] extends undefined
      ? (params: RequestParams[E]) => Promise<RequestResponses[E]>
      : (params: RequestParams[E],payload: RequestPayload[E]) => Promise<RequestResponses[E]>
  : never {
  const { show } = useContext(ModalContext);

  const request = async (
    payload?: RequestPayload[E],
    params?: RequestParams[E]
  ): Promise<RequestResponses[E] | undefined> => {
    try {
      const config = configs[service];
      const method: HttpMethod = config.method;

      const response = await handleRequest(method, config.path, { params, payload });
      const data: ApiErrorsResponse = await response.json();

      if (!response.ok) {
        if (data.message) {
          toast.error(data.message);
          return undefined;
        }
        if (data.error) {
          throw new Error(JSON.stringify(data.error, null, 2));
        }
        throw new Error("Unexpected error response");
      }

      if (successMsg) {
        toast.success(successMsg);
      }

      return data as RequestResponses[E];
    } catch (error) {
      console.error("Error fetching data:", error);
      show((error as Error).message);
      throw error;
    }
  };

  return request as any;
}
