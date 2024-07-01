import { FC, useState } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Claim_ } from "../../models/Claim";
import { Policy_ } from "../../models/Policy";
import Title from "../../shared/components/Title";
import { AuthStorageKeys } from "../../shared/enums/AuthStorageKeys";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import getUserClaimsPaginated from "../../shared/services/get-user-claims-paginated";
import getUserPoliciesPaginated from "../../shared/services/get-user-policies-paginated";
import moment from "moment";

enum ClaimTabs {
  PEDNING = "Pending Claims",
  SUBMIT = "Submit Claim",
}

const format = "MM-DD-YYYY"

const ClaimSubmission: FC = () => {
  const [tab, setTab] = useState<ClaimTabs>(ClaimTabs.PEDNING);
  const userId = sessionStorage.getItem(AuthStorageKeys.USER_ID);

  const [policies, setPolicies] = useState<Policy_[]>([]);
  const [claims, setClaims] = useState<Claim_[]>([]);

  const navigate = useNavigate();
  useAsyncEffect(async () => {
    const policies = await getUserPoliciesPaginated(1, 20);
    setPolicies(policies);
  }, [userId]);

  useAsyncEffect(async () => {
    const claims = await getUserClaimsPaginated(1, 20);
    setClaims(claims);
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
          onSelect={(eventKey) => {
            setTab(eventKey as ClaimTabs);
          }}
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
                  <th scope="col">Claim Number</th>
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
                  <tr className="align-middle" key={claim._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{claim.claimNumber}</td>
                    <td>{claim.policyNumber}</td>
                    <td>{moment(claim.submissionDate).format(format)}</td>
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
                  <tr className="align-middle" key={policy._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{policy.policyNumber}</td>
                    <td>{policy.type}</td>
                    <td>{moment(policy.beginDate).format(format)}</td>
                    <td>{moment(policy.endDate).format(format)}</td>
                    <td>{moment(policy.purchaseDate).format(format)}</td>
                    <td className="text-end">
                      <Button
                        variant="primary"
                        onClick={() => navigate({ pathname: policy._id })}
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
