import React from 'react'
import axios from "axios";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getPizzas = async () => {
      const res = await axios.get(
        "https://63642ce67b209ece0f42316d.mockapi.io/items"
      );

      setPizzas(res.data);
      setIsLoading(false);
    };
    React.useEffect(() => {
      getPizzas();
    }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj) => {
              return <PizzaBlock key={obj.id} {...obj} />;
            })}
      </div>
    </>
  );
}

export default Home
