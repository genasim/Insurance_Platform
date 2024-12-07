import toast from "react-hot-toast";
import { handleRequest } from "../handle-request";

const loadPolicyTemplates = async () => {
  try {
    const response = await handleRequest("GET", "/auth/policy-types");
    const templates = await response.json();
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Forbidden");
      }
      throw new Error("Couldn't load claim info ...");
    }
    
    return templates;
  } catch (error) {
    console.error(error);
    toast.error((error as Error).message);
    return [];
  }
};

export default loadPolicyTemplates;
