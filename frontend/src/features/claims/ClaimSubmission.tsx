import { FC, useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Claim } from "../../models/Claim";
import { Policy } from "../../models/Policy";
import API, { Tables } from "../../shared/api-client/ApiClient";
import Title from "../../shared/components/Title";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import {AuthStorageKeys} from "../../shared/enums/AuthStorageKeys";

enum ClaimTabs {
  PEDNING = "Pending Claims",
  SUBMIT = "Submit Claim",
}

const ClaimSubmission: FC = () => {
  const [tab, setTab] = useState<ClaimTabs>(ClaimTabs.PEDNING);
  const userId = sessionStorage.getItem(AuthStorageKeys.USER_ID);

  const [policies, setPolicies] = useState<Policy[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);

  const navigate = useNavigate();
  useAsyncEffect(async () => {
    const _policies = (await API.findAll<Policy>(Tables.POLICIES)).filter(
      (policy) => policy.holderId === userId
    );
    setPolicies(_policies);
  }, [userId]);

  useAsyncEffect(async () => {
    const _claims = (await API.findAll<Claim>(Tables.CLAIMS)).filter(
      (claim) => claim.claimantId === userId
    );
    setClaims(_claims);
  }, [userId]);

  return (
    <Container>
      <Title
        title="Submit your claim reimbursments"
        meta="Select one of your policies and fill the form to submit your claim"
      />
      <div>
        <Nav
          variant="tabs"
          activeKey={tab}
          onSelect={(eventKey) => setTab(eventKey as ClaimTabs)}
        >
          <Nav.Item>
            <Nav.Link eventKey={ClaimTabs.PEDNING}>Pending Claims</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={ClaimTabs.SUBMIT}>Submit a Claim</Nav.Link>
          </Nav.Item>
        </Nav>
        {tab === ClaimTabs.PEDNING && (
          <>
            <h2 className="my-4">Pending Claims:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Policy</th>
                  <th scope="col">Submitted on</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Curruncy</th>
                  <th scope="col">Type</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim, idx) => (
                  <tr className="align-middle" key={claim.id}>
                    <th scope="row">{claim.claimNumber}</th>
                    <td>{claim.policyNumber}</td>
                    <td>{claim.submissionDate.toString()}</td>
                    <td>{claim.claimedAmount}</td>
                    <td>{claim.claimedAmountCurrency}</td>
                    <td>{claim.eventType}</td>
                    <td className="text-end">
                      <Button variant="primary" disabled>
                        {claim.status}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {tab === ClaimTabs.SUBMIT && (
          <>
            <h2 className="my-4">Your policies:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Policy Number</th>
                  <th scope="col">Type</th>
                  <th scope="col">Begin Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Purchase Date</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy, idx) => (
                  <tr className="align-middle" key={policy.id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{policy.policyNumber}</td>
                    <td>{policy.type}</td>
                    <td>{policy.beginDate.toString()}</td>
                    <td>{policy.endDate.toString()}</td>
                    <td>{policy.purchaseDate.toString()}</td>
                    <td className="text-end">
                      <Button
                        variant="primary"
                        onClick={() => navigate({ pathname: policy.id })}
                      >
                        Select
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Container>
  );
};

export default ClaimSubmission;
