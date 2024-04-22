import { RouteObject } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import DocManager from "./admin/DocManager";
import UserManager from "./admin/UserManager";
import Claims from "./backoffice/Claims";
import ClaimsPayment from "./backoffice/ClaimsPayment";
import ExpertDashboard from "./backoffice/Dashboard";
import Policies from "./backoffice/Policies";
import PoliciesPayment from "./backoffice/PoliciesPayment";
import ClaimSubmission from "./client/ClaimSubmission";
import ClientDashboard from "./client/Dashboard";

export type PageGroups = "unprotected" | "client" | "backoffice" | "admin";

type Page = Required<Pick<RouteObject, "Component" | "path">> & {
  title: string;
};

type Pages = { [key in PageGroups]: readonly Page[] };

export const pages: Pages = {
  unprotected: [
    { Component: Home, path: "/", title: "Home" },
    { Component: Auth, path: "/auth", title: "Auth" },
  ],
  client: [
    { Component: ClientDashboard, path: "", title: "Dashboard" },
    { Component: PoliciesPayment, path: "policies", title: "Buy Policy" },
    { Component: ClaimSubmission, path: "claims", title: "Submit Claim" },
  ],
  backoffice: [
    { Component: ExpertDashboard, path: "", title: "Dashboard" },
    { Component: Policies, path: "policies", title: "Policies" },
    {
      Component: PoliciesPayment,
      path: "policies/payments",
      title: "Policy Payments",
    },
    { Component: Claims, path: "claims", title: "Claims" },
    {
      Component: ClaimsPayment,
      path: "claims/payments",
      title: "Claim Payments",
    },
  ],
  admin: [
    { Component: UserManager, path: "user-management", title: "Manage users" },
    {
      Component: DocManager,
      path: "document-management",
      title: "Manage docs",
    },
  ],
};

export default pages
