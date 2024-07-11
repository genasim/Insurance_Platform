import { CalculationCoefficient_ } from "../../models/CalculationCoefficient";
import { Claim_, ClaimDTO_ } from "../../models/Claim";
import { ClaimDocumentDTO_ } from "../../models/ClaimDocument";
import { Policy_, PolicyDto } from "../../models/Policy";
import { PolicyPackage_ } from "../../models/PolicyPackage";
import { PolicyType } from "../../models/PolicyType";
import Services from "../enums/Services";
import { HttpMethod } from "../handle-request";

type PaginationInfo = {
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
    payload: PaginationInfo;
    params: undefined;
  };
  [Services.CreateClaim]: {
    response: Claim_;
    method: "POST";
    payload: { claimDTO: ClaimDTO_, documents: ClaimDocumentDTO_[] };
    params: undefined;
  };
  [Services.CreatePolicy]: {
    response: Policy_;
    method: "POST";
    payload: PolicyDto;
    params: undefined;
  };
  [Services.GetPolicyTypeCoefficients]: {
    response: CalculationCoefficient_[];
    method: "GET";
    payload: undefined;
    params: { type: PolicyType };
  };
  [Services.GetPolicyTypePackages]: {
    response: PolicyPackage_[];
    method: "GET";
    payload: undefined;
    params: { type: PolicyType };
  };
  [Services.GetUserClaimsPaginated]: {
    response: Claim_[];
    method: "GET";
    payload: PaginationInfo;
    params: undefined;
  };
  [Services.GetUserPoliciesPaginated]: {
    response: Policy_[];
    method: "GET";
    payload: PaginationInfo;
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
  [Services.CreateClaim]: { method: "POST", path: "/clients/claims" },
  [Services.CreatePolicy]: { method: "POST", path: "/clients/policies" },
  [Services.GetPolicyTypeCoefficients]: { method: "GET", path: "/clients/policies/:type/coefficients" },
  [Services.GetPolicyTypePackages]: { method: "GET", path: "/clients/policies/:type/packages" },
  [Services.GetUserClaimsPaginated]: { method: "GET", path: "/clients/claims" },
  [Services.GetUserPoliciesPaginated]: { method: "GET", path: "/clients/policies" },
};
