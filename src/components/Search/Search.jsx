import React, { useCallback } from "react";
import styles from "../Search/Search.module.scss";
import { MdClear } from "react-icons/md";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );
  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };
  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };
  return (
    <div className={styles.block_search}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input_search}
        type="text"
        placeholder="Поиск пиццы ..."
      />
      {value && <MdClear onClick={onClickClear} className={styles.icon} />}
    </div>
  );
};

export default Search;
