import React from "react";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../features/filterSlice";
import BurgerBlock from "../components/PizzaBlock/BurgerBlock";

const Burger = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(SearchContext);

  // const [formactive, setFormActive] = React.useState(false)
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  // const handleActiveOtziv = () => {
  //   setFormActive(true)
  // }

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `https://63642ce67b209ece0f42316d.mockapi.io/burger?${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType.sortProperty}&order=desc`
    );
    setPizzas(res.data);
    setIsLoading(false);
    window.scrollTo(0, 0);
  };
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>

      <h2 className="content__title">Все бургеры</h2>
      <div className="content__items" style={{marginTop: '-135px'}}>
        {isLoading
          ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
          : pizzas
              .filter(
                (item) =>
                  item.title.toUpperCase().slice(0, searchValue.length) ===
                  searchValue.toUpperCase()
              )
              ?.map((obj) => {
                return <BurgerBlock key={obj.id} {...obj} />;
              })}
       
      </div>
    </div>
  );
};

export default Burger;
