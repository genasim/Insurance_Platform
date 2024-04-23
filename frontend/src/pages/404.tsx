import { Link, useNavigate } from "react-router-dom";
import { Button, Header, Icon } from "semantic-ui-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="ui center aligned segment container">
      <div className="segment very padded">
        <Header as="h1">
          <Icon name="exclamation triangle" />
          404 - Page Not Found
        </Header>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button primary as={Link} onClick={() => navigate({ pathname: "/" })}>
          Go to Home Page
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
