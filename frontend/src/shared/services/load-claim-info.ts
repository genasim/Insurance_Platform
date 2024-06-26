import { LoaderFunctionArgs } from "react-router-dom";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const loadClaimInfo = async ({ params }: LoaderFunctionArgs<any>) => {
  try {
    const claimInfo = await fetch(
      `http://localhost:5000/api/backoffice/claim/${params.claimId}`,
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

    return claimInfo;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export default loadClaimInfo;
