import { useEffect, useState } from "react";
import MyCard from "../components/MyCard";
import Banner from "../components/Banner";
import "./Home.css";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

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

  return (
    <div>
      <Banner>
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </Banner>
      <div className="container">
        <div className="row justify-content-center align-items-center mt-4">
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="col-12 col-md-3 mb-3 mx-auto"
              style={{ margin: 0 }}
            >
              <MyCard pizza={pizza} id={pizza.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
