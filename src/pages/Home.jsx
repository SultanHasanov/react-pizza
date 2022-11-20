import React from "react";
import axios from "axios";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Sort from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../features/filterSlice";

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://63642ce67b209ece0f42316d.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}`
    );
    setPizzas(res.data);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getPizzas();
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter(
                (item) =>
                  item.title.toUpperCase().slice(0, searchValue.length) ===
                  searchValue.toUpperCase()
              )
              ?.map((obj) => {
                return <PizzaBlock key={obj.id} {...obj} />;
              })}
      </div>
    </div>
  );
};

export default Home;
