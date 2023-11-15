import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import "./App.css";

import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import NotFound from "./views/NotFound";
import Carrito from "./views/Carrito";

function App() {

  return (
    <div>
      <CartProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
