import React from "react";
import { CardGroup, Container } from "react-bootstrap";
import Policy from "../components/Policy";
import { mock_policies } from "../models/policy";
import Title from "../components/Title";
import HomeCard from "../components/Cards/HomeCard";
import { homeCards } from "../models/home-card";

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
      <CardGroup className="my-5 d-flex flex-row flex-wrap gap-5 justify-content-center">
        {homeCards.map((card) => (
          <HomeCard key={card.id} card={card} />
        ))}
      </CardGroup>
    </Container>
  );
};

export default Home;
