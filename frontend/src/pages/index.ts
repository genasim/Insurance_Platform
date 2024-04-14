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

interface Page extends Required<Pick<RouteObject, "Component" | "path">> {
  title: string
}

export const unprotected = [
  { Component: Home, path: "/", title: "Home" },
  { Component: Auth, path: "/auth", title: "Auth" },
] as readonly Page[];

export const client = [
  { Component: ClientDashboard, path: "", title: "Dashboard" },
  { Component: PoliciesPayment, path: "policies", title: "Buy Policy" },
  { Component: ClaimSubmission, path: "claims", title: "Submit Claim" },
] as readonly Page[];

export const backoffice = [
  { Component: ExpertDashboard, path: "", title: "Dashboard" },
  { Component: Policies, path: "policies", title: "Policies" },
  { Component: PoliciesPayment, path: "policies/payments", title: "Policy Payments" },
  { Component: Claims, path: "claims", title: "Claims" },
  { Component: ClaimsPayment, path: "claims/payments", title: "Claim Payments" },
] as readonly Page[];

export const admin = [
  { Component: UserManager, path: "user-management", title: "Manage users" },
  { Component: DocManager, path: "document-management", title: "Manage docs" },
] as readonly Page[];
