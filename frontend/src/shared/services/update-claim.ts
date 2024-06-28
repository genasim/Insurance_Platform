import { Claim_ } from "../../models/Claim";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const updateClaim = async (claim: Claim_) => {
  const response = await fetch("http://localhost:5000/api/backoffice/claims", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem(AuthStorageKeys.TOKEN)}`,
    },
    body: JSON.stringify({
      claim,
    }),
  });

  const body = await response.json()
  if (response.status === 400) {
    console.error(body.errors);
    throw new Error("Error while updating claim")
  }
  
  if (response.status >= 400) {
    console.error(body.message);
    throw new Error("Error while updating claim")
  }

  return body as Claim_;
};

export default updateClaim;
