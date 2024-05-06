import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    // <div className="ui center aligned segment container">
    //   <div className="segment very padded">
    //     <Header as="h1">
    //       <Icon name="exclamation triangle" />
    //       404 - Page Not Found
    //     </Header>
    //     <p>
    //       The page you are looking for might have been removed, had its name
    //       changed, or is temporarily unavailable.
    //     </p>
    //     <Button primary as={Link} onClick={() => navigate({ pathname: "/" })}>
    //       Go to Home Page
    //     </Button>
    //   </div>
    // </div>
    <Container className="my-5">
      <Alert variant="warning">
        <div className="d-flex flex-row align-items-center">
          <IoWarningOutline size={40} className="mx-3" />
          <Alert.Heading as="h1">404 - Page Not Found</Alert.Heading>
        </div>
        <hr />
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="w-100 d-flex justify-content-center">
          <Button variant="warning" onClick={() => navigate({ pathname: "/" })}>
            Go to Home page
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default NotFoundPage;
