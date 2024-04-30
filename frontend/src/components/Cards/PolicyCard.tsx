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
import { Policy } from "../../models/policy";

export interface PolicyCardProps {
  policy: Policy
  onButtonClick?: () => void;
}

const PolicyCard: FC<PolicyCardProps> = ({
  policy,
  onButtonClick,
}) => {
  return (
    <Card raised style={{ borderRadius: "2rem" }}>
      <Grid>
        <Grid.Column width={8}>
          <Image className="container segment basic very padded" src={policy.imgSrc} style={{ borderRadius: "2rem 0 0 2rem" }} />
        </Grid.Column>
        <Grid.Column stretched width={8}>
          <Segment
            padded
            basic
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Header color="blue" size="large">
              {policy.header}
            </Header>
            <div
              className="container segment basic very padded"
              style={{ flexGrow: 1 }}
            >
              {policy.desctiption.map((descr) => (
                <div key={descr}>
                  <span className="ui large sub margin text">
                  <i className="check circle outline icon"></i>
                  {descr}
                  </span>
                </div>
              ))}
            </div>
            <Button size="medium" compact circular fluid primary onClick={onButtonClick}>
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
