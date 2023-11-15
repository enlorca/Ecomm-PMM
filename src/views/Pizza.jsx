import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyCard2 from "../components/MyCard2";

function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    console.log("Detalles pizza para el id:", id);
    const fetchData = async () => {
      try {
        const response = await fetch("/pizzas.json");
        const data = await response.json();
        console.log("Pizza Data:", data);
        const selectedPizza = data.find((pizza) => pizza.id === id);
        setPizza(selectedPizza);
        console.log("Detalles :", selectedPizza);
      } catch (error) {
        console.error("Error fetching pizza details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!pizza) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="d-flex justify-content-center py-4">
      <MyCard2 pizza={pizza} />
    </div>
  );
}

export default Pizza;
