import { FC } from "react";
import { Card } from "react-bootstrap";
import { HomeCard as Type } from "../../models/home-card";

interface HomeCardProps {
  card: Type;
}

const HomeCard: FC<HomeCardProps> = ({ card }) => {
  return (
    <Card className="rounded-5 shadow border">
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Img
          src={card.imageUrl}
          style={{ width: "15rem" }}
          className="m-1"
        />
        <Card.Text className="fs-1 my-4">{card.title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
