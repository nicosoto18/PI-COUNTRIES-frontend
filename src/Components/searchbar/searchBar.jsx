import style from "./searchBar.module.css"
import { useState } from "react";
import Card from "../Card/Card";
import { useDispatch } from "react-redux";
import { countryName } from "../redux/actions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  // const CountryResult = useSelector((state) => state.searchResults);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleClick = () => {
    try {
      dispatch(countryName(country));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input className={style.inputSearch} type="text" value={country} onChange={handleChange} />
     
      <button onClick={handleClick}>Buscar</button>
    </div>
    
  );
};
export default SearchBar;
