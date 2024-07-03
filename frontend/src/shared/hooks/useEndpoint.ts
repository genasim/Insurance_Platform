import { useContext } from "react";
import toast from "react-hot-toast";
import { handleRequest } from "../handle-request";
import { ModalContext } from "../layout/Layout";

type RestMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiErrorsResponse = {
  message?: string;
  error?: any;
};

export default function useEndpoint<T>(
  method: RestMethod,
  endpoint: string,
  successMsg?: string
) {
  const { show } = useContext(ModalContext);

  const request = async (body?: any): Promise<T | undefined> => {
    try {
      const response = await handleRequest(method, endpoint, body);
      const payload: ApiErrorsResponse = await response.json();

      if (!response.ok) {
        if (payload.message) {
          toast.error(payload.message);
          return undefined;
        }
        if (payload.error) {
          throw new Error(JSON.stringify(payload.error, null, 2));
        }
        throw new Error("Unexpected error response");
      }

      if (successMsg) {
        toast.success(successMsg);
      }

      return payload as T;
    } catch (error) {
      console.error("Error fetching data:", error);
      show((error as Error).message);
      throw error;
    }
  };

  return request;
}
