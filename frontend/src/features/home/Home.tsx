import React from "react";
import { Container } from "react-bootstrap";
import HomeCard from "./HomeCard";
import Policy from "../policies/Policy/PolicyFacade";
import Title from "../../shared/components/Title";
import { homeCards } from "../../models/home-card";
import { mock_policies } from "../policies/policyGenadi";

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
      <div className="my-5 d-flex flex-row flex-wrap gap-5 justify-content-center">
        {homeCards.map((card) => (
          <HomeCard key={card.id} card={card} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
