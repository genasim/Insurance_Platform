import { FC } from "react";
import { Card } from "react-bootstrap";
import { HomeCard as HomeCardType } from "../../models/home-card";

interface HomeCardProps {
  card: HomeCardType;
}

const HomeCard: FC<HomeCardProps> = ({ card }) => {
  return (
    <Card className="rounded-5 shadow border p-5" >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Img
          src={card.imageUrl}
          style={{ width: "10rem" }}
        />
        <Card.Text className="fs-3 mt-3">{card.title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HomeCard;
