import React from "react";
import { Link } from "react-router-dom";
import styles from '../scss/pages/NotFount.module.scss'

const NotFound = () => {
  return (
    <div className={styles.error}>
      <h1>
        Ничего не найдено <span>😕</span>
      </h1>
      <h1>
        Перейдите на главную{" "}
        <Link to="/">
          <span className={styles.error_pages}>страницу</span>
        </Link>
      </h1>
    </div>
  );
};

export default NotFound;
