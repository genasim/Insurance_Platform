import Services from "../enums/Services";
import { HttpMethod } from "../handle-request";

type Keys = Record<
  Services,
  {
    response: any;
    method: HttpMethod;
    payload: any | undefined;
    params: any | undefined;
  }
>;

export interface ServiceRequests extends Keys {
  [Services.LoginUser]: {
    response: { token: string };
    method: "POST";
    payload: { email: string; password: string };
    params: undefined;
  };
  [Services.RegisterUser]: {
    response: { token: string };
    method: "POST";
    payload: { email: string; password: string, fullName: string };
    params: undefined;
  }
}

type RequestMethods = { [K in Services]: ServiceRequests[K]["method"] };
export const serviceConfigs: {
  [K in Services]: { method: RequestMethods[K]; path: string };
} = {
  [Services.LoginUser]: { method: "POST", path: "/auth/login" },
  [Services.RegisterUser]: { method: "POST", path: "/auth/register" },
};
