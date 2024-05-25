import { FC } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorBoundary: FC = () => {
    const error = useRouteError() as Error;
    const navigate = useNavigate();

    return (
      <Container className="my-5">
        <Alert variant="danger">
          <div className="d-flex flex-row align-items-center">
            <IoWarningOutline size={40} className="mx-3" />
            <Alert.Heading as="h1">Oops :(</Alert.Heading>
          </div>
          <hr />
          <p>
            It appears we are experiencing a critical error on our end as something seems to have gone very wrong ;( <br />
            We will put all our efforts into fixing the issue
          </p>
          <hr />
          <h3>Message: <span className="fs-6">{error.message}</span></h3>
          <p>Trace:</p>
          <p>{error.stack}</p>
          <div className="w-100 d-flex justify-content-center">
            <Button variant="danger" onClick={() => navigate({ pathname: "/" })}>
              Go to Home page
            </Button>
          </div>
        </Alert>
      </Container>
    );
}
 
export default ErrorBoundary;