import React from "react";
import {
  CardGroup,
  Container,
  Divider,
  Header,
  Segment,
} from "semantic-ui-react";
import PolicyCard from "../components/Cards/PolicyCard";
import { mock_policies } from "../models/policy";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Container>
      <Container fluid textAlign="center">
        <Segment basic padded="very">
          <Header as="span" className="ui center huge text">
            BUY AN ONLINE INSURENCE TODAY!
          </Header>
          <Divider hidden />
          <Header.Subheader as="span" className="ui center massive text">
            Reliable premium insurance experience
          </Header.Subheader>
        </Segment>
      </Container>
      <Divider section hidden />
      <CardGroup centered stackable itemsPerRow={2}>
        {mock_policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </CardGroup>
    </Container>
  );
};

export default Home;
