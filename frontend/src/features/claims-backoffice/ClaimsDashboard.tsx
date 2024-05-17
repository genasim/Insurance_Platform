import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Title from "../../shared/components/Title";
import { Claim } from "../../models/Claim";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import API, { Tables } from "../../shared/api-client/ApiClient";

const ClaimsDashboard: FC = () => {
    const [claims, setClaims] = useState<Claim[]>([])
    const [error, setError] = useState<Error>()

    useAsyncEffect(async () => {
        try {
            const _claims = await API.findAll<Claim>(Tables.CLAIMS)
            setClaims(_claims)
        } catch (error) {
            setError(error as Error)
        }
    },[])

    return ( 
        <Container>
            <Title title="Pending claims for processing" />
            
          <>
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
                {claims.map((claim) => (
                  <tr className="align-middle" key={claim.id}>
                    <th scope="row">{claim.claimNumber}</th>
                    <td>{claim.policyNumber}</td>
                    <td>{claim.submissionDate.toString()}</td>
                    <td>{claim.claimedAmount}</td>
                    <td>{claim.claimedAmountCurrency}</td>
                    <td>{claim.eventType}</td>
                    <td className="text-end">
                      <Button variant="primary">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        
        </Container>
     );
}
 
export default ClaimsDashboard;