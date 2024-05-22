import { LoaderFunctionArgs } from "react-router-dom";
import { Policy } from "../../models/Policy";
import API, { Tables } from "../api-client/ApiClient";

const loadPolicy = async ({ params }: LoaderFunctionArgs) => {
  try {
    const policy = await API.findById<Policy>(
      Tables.POLICIES,
      params.policyId ?? ""
    );
    return policy;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default loadPolicy