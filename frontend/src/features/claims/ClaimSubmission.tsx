import { FC, useState } from "react";
import Title from "../../shared/components/Title";
import { Policy } from "../../models/Policy";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import API from "../../shared/api-client/ApiClient";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ClaimSubmissionProps {}

const ClaimSubmission: FC<ClaimSubmissionProps> = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const userId = sessionStorage.getItem("user-id");

  const navigate = useNavigate();

  useAsyncEffect(async () => {
    const policies = (await API.findAll<Policy>("policies")).filter(
      (policy) => policy.holderId === userId
    );
    setPolicies(policies);
  }, [userId]);

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
                  className="me-3"
                  onClick={() => navigate({ pathname: policy.id })}
                >
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
