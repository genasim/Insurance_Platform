import { useCallback, useContext } from "react";
import toast from "react-hot-toast";
import { handleRequest, HttpMethod } from "../handle-request";
import { ModalContext } from "../layout/Layout";
import Services from "../enums/Services";
import { serviceConfigs, ServiceRequests } from "../services/ServiceRequests";

type ApiErrorsResponse = {
  message?: string;
  error?: any;
};

type Requests = { [K in Services]: ServiceRequests[K] };
type RequestPayload = { [K in Services]: ServiceRequests[K]["payload"] };
type RequestParams = { [K in Services]: ServiceRequests[K]["params"] };
type RequestResponses = { [K in Services]: ServiceRequests[K]["response"] };


export default function useService<E extends Services>(
  service: E,
  successMsg?: string
): E extends keyof Requests
  ? RequestParams[E] extends undefined
    ? RequestPayload[E] extends undefined
      ? () => Promise<RequestResponses[E]>
      : (payload: RequestPayload[E]) => Promise<RequestResponses[E]>
    : RequestPayload[E] extends undefined
      ? (params: RequestParams[E]) => Promise<RequestResponses[E]>
      : (params: RequestParams[E],payload: RequestPayload[E]) => Promise<RequestResponses[E]>
  : never {
  const { show } = useContext(ModalContext);

  const request = useCallback(async (
    payload?: RequestPayload[E],
    params?: RequestParams[E]
  ): Promise<RequestResponses[E] | undefined> => {
    try {
      const config = serviceConfigs[service];
      const method: HttpMethod = config.method;

      const response = await handleRequest(method, config.path, { params, payload });
      const data: ApiErrorsResponse = await response.json();

      if (!response.ok) {
        if (data.message) {
          toast.error(data.message);
          return undefined;
        }
        if (data.error) {
          throw new Error(JSON.stringify(data.error, null, 2));
        }
        throw new Error("Unexpected error response");
      }

      if (successMsg) {
        toast.success(successMsg);
      }

      return data as RequestResponses[E];
    } catch (error) {
      console.error("Error fetching data:", error);
      show((error as Error).message);
      throw error;
    }
  }, [service, show, successMsg]);

  return request as any;
}
