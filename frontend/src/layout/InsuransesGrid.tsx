import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface InsuranceGridProps {
  items: string[];
  itemsPerCol: number;
}

const InsurancesGrid: FC<InsuranceGridProps> = ({ items, itemsPerCol }) => {
  const chunk = (arr: string[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const itemGroups = chunk(items, itemsPerCol);

  return (
    <Row>
      {itemGroups.map((group, index) => (
        <Col key={index}>
          {group.map((item, idx) => (
            <p className="fs-5" key={idx}>
              <MdOutlineKeyboardDoubleArrowRight /> {item}
            </p>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default InsurancesGrid;
