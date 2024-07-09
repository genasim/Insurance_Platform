import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Claim_ } from "../../models/Claim";
import Title from "../../shared/components/Title";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import useService from "../../shared/hooks/useService";
import Services from "../../shared/enums/Services";

const ClaimsDashboard: FC = () => {
    const [claims, setClaims] = useState<Claim_[]>([])
    const getClaimsPaginated = useService(Services.GetClaimsPaginated)

    useAsyncEffect(async () => {
      try {
        const claims = await getClaimsPaginated({ page: 1, size: 20 });
        setClaims(claims)        
      } catch (error) {}
    }, [])

    const navigate = useNavigate()

    return ( 
        <Container>
            <Title title="Pending claims for processing" />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Claim number</th>
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
                    <th scope="row">{idx}</th>
                    <td>{claim.claimNumber}</td>
                    <td>{claim.policyNumber}</td>
                    <td>{claim.submissionDate.toString()}</td>
                    <td>{claim.claimedAmount}</td>
                    <td>{claim.claimedAmountCurrency}</td>
                    <td>{claim.eventType}</td>
                    <td className="text-end">
                      <Button variant="primary" onClick={() => navigate(claim._id)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </Container>
     );
}
 
export default ClaimsDashboard;