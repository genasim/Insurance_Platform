import { PolicyTemplates } from "../../models/PolicyTemplates";
import API, { Tables } from "../api-client/ApiClient";

const loadPolicyTemplates = async () => {
  try {
    const templates = await API.findAll<PolicyTemplates>(
      Tables.POLICY_TEMPLATES
    );
    return templates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default loadPolicyTemplates;
