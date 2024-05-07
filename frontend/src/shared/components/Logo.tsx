import { FC } from "react";
import { Link } from "react-router-dom";

const Logo: FC = () => (
  <Link to="/" className="navbar-brand fs-2">
    <h2 className="fw-bold text-secondary">
      <i className="bi bi-car-front mx-2"></i>Safe Insure
    </h2>
  </Link>
);

export default Logo;
