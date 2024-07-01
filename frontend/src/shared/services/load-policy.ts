import { LoaderFunctionArgs } from "react-router-dom";
import { Policy_ } from "../../models/Policy";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

const loadPolicy = async ({ params }: LoaderFunctionArgs) => {
  try {
    const policy = await fetch(
      `http://localhost:5000/api/clients/policies/${params.policyId}`,
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

    return (await policy.json()) as Policy_;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export default loadPolicy;
