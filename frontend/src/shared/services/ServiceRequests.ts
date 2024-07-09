import { Claim_ } from "../../models/Claim";
import Services from "../enums/Services";
import { HttpMethod } from "../handle-request";

type PaginationParams = {
  page: number;
  size: number;
};

type UserToken = {
  token: string;
};

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
    response: UserToken;
    method: "POST";
    payload: { email: string; password: string };
    params: undefined;
  };
  [Services.RegisterUser]: {
    response: UserToken;
    method: "POST";
    payload: { email: string; password: string; fullName: string };
    params: undefined;
  };
  [Services.CheckValidEmail]: {
    response: { valid: boolean };
    method: "GET";
    payload: { email: string };
    params: undefined;
  };
  [Services.GetClaimsPaginated]: {
    response: Claim_[];
    method: "GET";
    payload: PaginationParams;
    params: undefined;
  };
}

type RequestMethods = { [K in Services]: ServiceRequests[K]["method"] };
export const serviceConfigs: {
  [K in Services]: { method: RequestMethods[K]; path: string };
} = {
  [Services.LoginUser]: { method: "POST", path: "/auth/login" },
  [Services.RegisterUser]: { method: "POST", path: "/auth/register" },
  [Services.CheckValidEmail]: { method: "GET", path: "/auth/valid-email" },
  [Services.GetClaimsPaginated]: { method: "GET", path: "/backoffice/claims" },
};
