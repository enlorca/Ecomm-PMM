import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

function MyCard({ pizza, id }) {
  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/Pizza/${id}`);
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pizza.id);
    console.log("Se agrega elemento a carro:", pizza.id);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={pizza.img} />
      <Card.Body>
        <Card.Title>
          <strong>{capitalize(pizza.name)}</strong>
        </Card.Title>
        <hr />
        <strong>Ingredientes:</strong>
        <ul>
          {pizza.ingredients.map((ingredient, i) => (
            <li key={i}>🍕 {capitalize(ingredient)}</li>
          ))}
        </ul>
        <h2 className="d-flex justify-content-center mt-4">$ {pizza.price}</h2>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" onClick={handleDetail}>
            Ver Más 👀
          </Button>
          <Button variant="danger" onClick={handleAddToCart}>
            Añadir 🛒
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
