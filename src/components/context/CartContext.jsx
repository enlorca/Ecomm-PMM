import { createContext, useContext, useState, useEffect } from "react";
import Notification from "../../components/Notification";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/pizzas.json");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error consiguiendo datos de los productos:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (pizzaId) => {
    setCart((prevCart) => [...prevCart, pizzaId]);
    const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
    if (pizza) {
      setNotification(`Se agregó la pizza "${pizza.name}" al carrito!`);
    }
  };

  const removeFromCart = (pizzaId) => {
    setCart((prevCart) => prevCart.filter((id) => id !== pizzaId));
  };

  const increaseQuantity = (pizzaId) => {
    setCart((prevCart) => [...prevCart, pizzaId]);
  };

  const decreaseQuantity = (pizzaId) => {
    const index = cart.indexOf(pizzaId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    setNotification(`Se ha vaciado el carrito`);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, pizzaId) => {
      const pizza = pizzas.find((pizza) => pizza.id === pizzaId);
      return total + (pizza ? pizza.price : 0);
    }, 0);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalPrice,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
