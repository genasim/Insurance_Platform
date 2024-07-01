import { Claim_ } from "../../models/Claim";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const getClaimsPaginated = async (page: number, size: number) => {
  try {
    const claims = await fetch(
      `http://localhost:5000/api/backoffice/claims?page=${page}&size=${size}`,
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

    return (await claims.json()) as Claim_[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getClaimsPaginated;
