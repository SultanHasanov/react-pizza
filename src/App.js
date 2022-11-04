import React from "react";
import axios from "axios";
import Header from "./components/Header";
import "./scss/app.scss";
import  Home  from "./pages/Home";
import NotFound from "./pages/NotFound";


function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getPizzas = async () => {
    const res = await axios(
      "https://63642ce67b209ece0f42316d.mockapi.io/items"
    );
    
    setPizzas(res.data);
    setIsLoading(false);
    
  };
  React.useEffect(() => {
    getPizzas();
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Home />
          {/* <NotFound /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
