import { FC } from "react";
import { Card, Image } from "semantic-ui-react";
import { HomeCard as Type } from "../../models/home-card";

interface HomeCardProps {
  card: Type;
}

const HomeCard: FC<HomeCardProps> = ({ card }) => {
  return (
    <Card raised style={{ borderRadius: "2rem" }}>
      <Card.Content textAlign="center">
        <Image rounded size="small" src={card.imageUrl} />
      </Card.Content>
      <Card.Header
        textAlign="center"
        as="span"
        className="ui segment basic big text"
      >
        {card.title}
      </Card.Header>
    </Card>
  );
};

export default HomeCard;
