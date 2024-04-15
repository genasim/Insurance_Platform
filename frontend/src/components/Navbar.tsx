import { Link } from "react-router-dom";
import pages from "../pages";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { ...rest } = props;

  return (
    <nav
      style={{
        width: "100vw",
        position: "fixed",
        top: "0",
        left: "0",
        height: "auto",
        background: "white",
        display: "flex",
        gap: "2rem",
        padding: "0 1rem",
        alignItems: "start",
        justifyContent: "center",
      }}
      {...rest}
    >
      {pages.unprotected.map((page) => (
        <Link  key={page.path} to={page.path}>
          {page.title}
        </Link>
      ))}
      <ul>
        {pages.client.map((page) => (
          <li key={page.path}>
            <Link to={`/client/${page.path}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {pages.backoffice.map((page) => (
          <li key={page.path}>
            <Link to={`/backoffice/${page.path}`}>{page.title}</Link>
          </li>
        ))}
      </ul>{" "}
      <ul>
        {pages.admin.map((page) => (
          <li key={page.path}>
            <Link to={`/admin/${page.path}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
