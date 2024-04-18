import { Link } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Garage</Link>
        </li>
        <li>
          <Link to="/winners">Winners</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
