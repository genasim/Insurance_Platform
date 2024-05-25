import React from "react";
import { Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { PolicyTemplates } from "../../models/PolicyTemplates";
import HomeCard from "./HomeCard";
import Policy from "./PolicyFacade";
import Title from "../../shared/components/Title";
import { homeCards } from "../../models/home-card";

const Home: React.FC = () => {
  const templates = useLoaderData() as PolicyTemplates[]

  return (
    <Container>
      <Title
        title="buy an online insurence today!"
        meta="Reliable premium insurance experience"
      />
      <div className="p-5 mt-5">
        <Policy.List policies={templates} />
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
