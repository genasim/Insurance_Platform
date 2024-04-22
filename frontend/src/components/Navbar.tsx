import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import pages, { PageGroups } from "../pages";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleItemClick = (
    group: PageGroups,
    path: string
  ): void => {
    const to: string =
      group !== "unprotected" ? `/${group}/${path}` : `${path}`;
    navigate(to);
  };

  return (
    <Menu>
      {Object.entries(pages).map(([key, value]) => (
        <Dropdown
          item
          text={key.charAt(0).toUpperCase() + key.slice(1)}
          key={key}
        >
          <Dropdown.Menu>
            {value.map((page) => (
              <Dropdown.Item
                key={page.path}
                onClick={_ => handleItemClick(key as PageGroups, page.path)}
              >
                {page.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ))}
    </Menu>
  );
};

export default Navbar;
