import { Policy_ } from "../../models/Policy";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const getUserPoliciesPaginated = async (page: number, size: number) => {
  try {
    const policies = await fetch(
      `http://localhost:5000/api/clients/policies?page=${page}&size=${size}`,
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

    return (await policies.json()) as Policy_[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getUserPoliciesPaginated;
