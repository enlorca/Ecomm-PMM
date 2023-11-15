import { useEffect, useState } from "react";
import { useCart } from "../components/context/CartContext";
import { Button } from "react-bootstrap";

function Carrito() {
  const { cart, getTotalPrice, increaseQuantity, decreaseQuantity } = useCart();
  const [pizzasData, setPizzasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/pizzas.json");
        const data = await response.json();
        setPizzasData(data);
      } catch (error) {
        console.error("Error consiguiendo datos de pizzas:", error);
      }
    };

    fetchData();
  }, []);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  console.log("Carrito:", cart);

  const { clearCart } = useCart();

  const handleClearCart = () => {
    clearCart();
    console.log("Se agrega elemento a carro:", pizza.id);
  };

  const getUniquePizzas = () => {
    const uniquePizzas = [...new Set(cart)];
    return uniquePizzas;
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center">Detalles del pedido</h4>
      <ul className="list-unstyled">
        {getUniquePizzas().map((pizzaId) => {
          const pizza = pizzasData.find((pizza) => pizza.id === pizzaId);
          const quantity = cart.filter((id) => id === pizzaId).length;

          return (
            <li key={pizzaId} className="mb-3">
              <div className="d-flex flex-column flex-md-row align-items-center">
                {pizza && (
                  <div className="me-md-3 mb-2 mb-md-0">
                    <img
                      src={pizza.img}
                      alt={pizza.name}
                      style={{ height: "50px", width: "50px" }}
                    />
                  </div>
                )}
                {pizza && (
                  <div className="me-md-3">
                    <p>{capitalize(pizza.name)}</p>
                  </div>
                )}
                {pizza && (
                  <div className="me-md-3">
                    <p>${pizza.price}</p>
                  </div>
                )}
                {pizza && (
                  <div className="d-flex align-items-center">
                    <Button
                      variant="danger"
                      onClick={() => increaseQuantity(pizzaId)}
                    >
                      +
                    </Button>
                    <span className="mx-2">Cantidad: {quantity}</span>
                    <Button
                      variant="primary"
                      onClick={() => decreaseQuantity(pizzaId)}
                    >
                      -
                    </Button>
                  </div>
                )}
              </div>
              <hr className="mt-2 mb-2" />
            </li>
          );
        })}
      </ul>
      <h3 className="text-center">Total: ${getTotalPrice(pizzasData)}</h3>
      <div className="d-flex justify-content-center g-2">
        <Button className="w-100">Ir a pagar</Button>
        <Button className="w-100 bg-danger" onClick={handleClearCart}>
          Vaciar carrito
        </Button>
      </div>
    </div>
  );
}

export default Carrito;
