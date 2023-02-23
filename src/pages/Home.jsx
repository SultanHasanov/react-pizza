import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div className="home_wrapper">
        <h1>Выберите категорию</h1>
        <div className="home_body">
          <Link to="/pizza">
            <img
              className="image_home"
              width="265px"
              src="https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg"
              alt=""
            />
          </Link>
          <Link to="/burger">
            <img
              className="image_home2"
              width="380px"
              src="https://img.freepik.com/free-photo/a-fresh-hamburger-with-salad-and-onion_144627-9522.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>
    );
};

export default Home;