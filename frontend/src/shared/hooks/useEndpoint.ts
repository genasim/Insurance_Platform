import { useContext } from "react";
import { handleRequest } from "../handle-request";
import { ModalContext } from "../layout/Layout";
import toast from "react-hot-toast";

type RestMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiErrorsResponse = {
  message?: string;
  error?: any;
};

export default function useEndpoint<T>(
  method: RestMethod,
  endpoint: string,
  body?: any,
  successMsg?: string
) {
  const { show } = useContext(ModalContext);

  const request = async (): Promise<T | undefined> => {
    try {
      const response = await handleRequest(method, endpoint, body);
      const payload: ApiErrorsResponse = await response.json();

      if (!response.ok) {
        if (payload.message) {
          toast.error(payload.message);
          throw new Error(payload.message);
        }
        if (payload.error) {
          show(payload.error);
          throw new Error(payload.error);
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
