import { PolicyDto } from "../../models/Policy";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const createPolicy = async (policy: PolicyDto) => {
  const resp = await fetch("http://localhost:5000/api/clients/policies", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
    },
    body: JSON.stringify(policy),
  });

  const body = await resp.json();
  if (resp.status > 400) {
    throw new Error(body.message);
  }

  if (resp.status === 400) {
    throw new Error(body.errors)
  }

  return body;
};

export default createPolicy;
