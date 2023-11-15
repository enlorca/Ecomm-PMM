
import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { useCart } from "../components/context/CartContext";
import "./Navigation.css";

const Navigation = () => {
  const { getTotalPrice } = useCart();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <Navbar variant="dark" className="bg-primary w-100">
      <Container className="d-flex justify-content-between mt-0 mb-0">
        <div>
          <Navbar.Brand>
            <NavLink
              className={`${setActiveClass} text-white pt-4 text-decoration-none`}
              to="/"
            >
              🍕 Pizzería Mamma Mia!
            </NavLink>
          </Navbar.Brand>
        </div>
        <div>
          <NavLink
            className={`${setActiveClass} text-white mt-3 text-decoration-none`}
            to="/carrito"
          >
            🛒 $ {getTotalPrice()}
          </NavLink>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
