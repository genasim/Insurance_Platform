import toast from "react-hot-toast";
import { LoaderFunctionArgs } from "react-router-dom";
import { handleRequest } from "../handle-request";

const loadClaimInfo = async ({ params }: LoaderFunctionArgs<any>) => {
  try {
    const response = await handleRequest("GET", "/backoffice/claims/:claimId", {
      params: { claimId: params.claimId },
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Forbidden");
      }
      throw new Error("Couldn't load claim info ...");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error((error as Error).message);
    return undefined;
  }
};

export default loadClaimInfo;
