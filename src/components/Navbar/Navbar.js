import { Link, useLocation } from "react-router-dom";

import { SidebarData } from "../SidebarData";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const currentPath =
    location.pathname.split("/")[1] === ""
      ? "home"
      : location.pathname.split("/")[1];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          <h2 className="header-nav">ThetaTube</h2>
          {SidebarData.map((item, i) => (
            <li
              key={i}
              className={item.cName}
              onClick={item.title === "Logout" ? handleLogout : null}
            >
              <Link
                className={`${
                  item.path === location.pathname
                    ? "active-nav"
                    : "inactive-nav"
                }`}
                to={item.path}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="navbar">
        <div className="menu-bars-wrapper">
          <p className="nav-pathname">{currentPath.replace("-", " ")}</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
