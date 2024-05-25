import { PolicyTemplate } from "../../models/PolicyTemplate";
import API, { Tables } from "../api-client/ApiClient";

const loadPolicyTemplates = async () => {
  try {
    const templates = await API.findAll<PolicyTemplate>(
      Tables.POLICY_TEMPLATES
    );
    return templates;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default loadPolicyTemplates;
