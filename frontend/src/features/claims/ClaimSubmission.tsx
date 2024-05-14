import { FC, useState } from "react";
import Title from "../../shared/components/Title";
import { Policy } from "../../models/Policy";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import API from "../../shared/api-client/ApiClient";
import { Button, Container } from "react-bootstrap";

interface ClaimSubmissionProps {}

interface ClaimSubmissionState {
  policies: Policy[];
}

const ClaimSubmission: FC<ClaimSubmissionProps> = () => {
  const [state, setState] = useState<ClaimSubmissionState>({ policies: [] });
  const token = sessionStorage.getItem("user-id");

  useAsyncEffect(async () => {
    const policies = (await API.findAll<Policy>("policies")).filter(
      (policy) => policy.holderId === token
    );
    setState({ ...state, policies: policies });
  }, []);

  return (
    <Container>
      <Title
        title="Submit your claim reimbursments"
        meta="Select one of your policies and fill the form to submit your claim"
      />

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
          {state.policies.map((policy, idx) => (
            <tr className="align-middle" key={policy.id}>
              <th scope="row">{idx + 1}</th>
              <td>{policy.policyNumber}</td>
              <td>{policy.type}</td>
              <td>{policy.beginDate.toString()}</td>
              <td>{policy.endDate.toString()}</td>
              <td>{policy.purchaseDate.toString()}</td>
              <td className="text-end">
                <Button variant="primary" className="me-3" onClick={() => {}}>
                  Select
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ClaimSubmission;
