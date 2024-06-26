import { ClaimDTO_ } from "../../models/Claim";
import { ClaimDocumentDTO_ } from "../../models/ClaimDocument";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const createClaim = async (claim: ClaimDTO_, docs: ClaimDocumentDTO_[]) => {
  const resp = await fetch("http://localhost:5000/api/clients/claims", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
    },
    body: JSON.stringify({
      ...claim,
      documents: [...docs],
    }),
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

export default createClaim;
