import { FC, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

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
            <Link className="fs-6 text-decoration-none" key={idx} to="/client/policies" >
              <MdOutlineKeyboardDoubleArrowRight /> {item}
            </Link>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default InsurancesGrid;
