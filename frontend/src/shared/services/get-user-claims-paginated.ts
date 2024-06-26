import { Claim_ } from "../../models/Claim";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const getUserClaimsPaginated = async (page: number, size: number) => {
  try {
    const policies = await fetch(
      `http://localhost:5000/api/clients/claims?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(
            AuthStorageKeys.TOKEN
          )}`,
        },
      }
    );

    return (await policies.json()) as Claim_[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserClaimsPaginated;
