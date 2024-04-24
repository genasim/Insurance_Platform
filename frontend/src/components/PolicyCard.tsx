import { FC } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

interface PolicyCardProps {
  imgSrc: string;
  header: string;
  desctiption: string[];
  onButtonClick?: () => void;
}

const PolicyCard: FC<PolicyCardProps> = ({
  header,
  desctiption,
  imgSrc,
  onButtonClick,
}) => {
  return (
    <Card raised style={{ borderRadius: "2rem" }}>
      <Grid>
        <Grid.Column width={8}>
          <Image src={imgSrc} style={{ borderRadius: "2rem 0 0 2rem" }} />
        </Grid.Column>
        <Grid.Column stretched width={8}>
          <Segment
            padded
            basic
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Header color="blue" size="large">
              {header}
            </Header>
            <div
              className="container segment basic very padded"
              style={{ flexGrow: 1 }}
            >
              {desctiption.map((descr) => (
                <div key={descr}>
                  <i className="check circle outline icon"></i>
                  {descr}
                </div>
              ))}
            </div>
            <Button compact circular fluid primary onClick={onButtonClick}>
              <Icon name="shopping cart" />
              Buy policy
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </Card>
  );
};

export default PolicyCard;
