import { FC, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface InsuranceGridProps {
  items: string[];
  cols: number;
}

const InsurancesGrid: FC<InsuranceGridProps> = ({ items, cols }) => {
  const itemsPerColumn = Math.ceil(items.length / cols);

  const chunk = useCallback(
    (arr: string[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size)
      ),
    []
  );

  const itemGroups = chunk(items, itemsPerColumn);

  return (
    <Row>
      {itemGroups.map((group, index) => (
        <Col key={index}>
          {group.map((item, idx) => (
            <p className="fs-6" key={idx}>
              <MdOutlineKeyboardDoubleArrowRight /> {item}
            </p>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default InsurancesGrid;
