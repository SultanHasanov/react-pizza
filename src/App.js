import React from "react";
import Header from "./components/Header";
import "./scss/app.scss";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Home from "./pages/Home";
import Burger from "./pages/Burger";



export const SearchContext = React.createContext()

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/burger" element={<Burger />} />
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
