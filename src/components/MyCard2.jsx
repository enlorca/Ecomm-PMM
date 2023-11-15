import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart } from "../components/context/CartContext";

function MyCard2({ pizza }) {
  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pizza.id);
  };

  return (
    <Card style={{ width: "80%" }}>
      <div className="row justify-content-center align-items-center mt-4 px-4 py-2">
        <div className="col-md-4">
          <Card.Img variant="top" src={pizza.img} />
        </div>

        <div className="col-md-8">
          <Card.Body>
            <Card.Title>
              <strong>{capitalize(pizza.name)}</strong>
            </Card.Title>
            <hr />
            <p>{pizza.desc}</p>
            <strong>Ingredientes:</strong>
            <ul>
              {pizza.ingredients.map((ingredient, i) => (
                <li key={i}>🍕 {capitalize(ingredient)}</li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h2>Precio: ${pizza.price}</h2>
              <Button variant="danger" onClick={handleAddToCart}>
                Añadir 🛒
              </Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
}

export default MyCard2;
