import React from 'react';
import styles from '../Search/Search.module.scss'
import { MdClear } from "react-icons/md";
import { SearchContext } from '../../App';

const Search = () => {

const onChangeInput = (e) => {
  setSearchValue(e.target.value);
  
}


  const { searchValue, setSearchValue } = React.useContext(SearchContext);
    return (
      <div className={styles.block_search}>
        <input
          value={searchValue}
          onChange={onChangeInput}
          className={styles.input_search}
          type="text"
          placeholder="Поиск пиццы ..."
        />
        {searchValue &&
        <MdClear onClick={() => setSearchValue('')} className={styles.icon} />
        }
      </div>
    );
};

export default Search;