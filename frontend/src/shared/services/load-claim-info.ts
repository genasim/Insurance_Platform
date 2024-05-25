import { LoaderFunctionArgs } from "react-router-dom";
import { Claim } from "../../models/Claim";
import { ClaimDocument } from "../../models/ClaimDocument";
import { Policy } from "../../models/Policy";
import API, { Tables } from "../api-client/ApiClient";
import {PolicyPackage} from "../../models/PolicyPackage";

const loadClaimInfo = async ({ params }: LoaderFunctionArgs<any>) => {
  try {
    const claim = await API.findById<Claim>(
      Tables.CLAIMS,
      params.claimId ?? ""
    );
    const docs = (
      await API.findAll<ClaimDocument>(Tables.CLAIM_DOCUMENTS)
    ).filter((doc) => doc.claimId === claim.id);
    const policy = await API.findById<Policy>(Tables.POLICIES, claim.policyId);
    const policyPackage = await API.findById<PolicyPackage>(
      Tables.POLICY_PACKAGES,
      policy.packageId
    );

    return { claim, docs, policyPackage };
  } catch (error) {
    console.error(error);
    return { error }
  }
};

export default loadClaimInfo;
