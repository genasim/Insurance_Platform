import React from "react";
import { Container } from "react-bootstrap";
import Policy from "../components/Policy";
import { mock_policies } from "../models/policy";
import Title from "../components/Title";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Container>
      <Title
        title="buy an online insurence today!"
        meta="Reliable premium insurance experience"
      />
      <div className="p-5 mt-5">
        <Policy.List policies={mock_policies} />
      </div>

    <Title title="why us" />
    </Container>
    
  );
};

export default Home;
