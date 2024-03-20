import { ALLCOUNTRIES,COUNTRYNAME,COUNTRYDETAIL,FILTERCARDS,ALLACTIVITIES,FILTERCOUNTRIESACTIVITIES,ORDERCARS, DELETECOUNTRYDETAIL} 
        from "./actiontypes";
import axios from "axios"; 

const allCountries = () => {
  return async (dispatch) => {
    try {
      const endpoint = "/countries";
      console.log("voy a ir a buscar los countries")
      const { data } = await axios.get(endpoint);
      console.log("mi data es", data)

      dispatch({
        type: ALLCOUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const countryName = (country) => {
  return async (dispatch) => {
    try {
      const endpoint = `/countriesByName?name=${country}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: COUNTRYNAME,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      alert("No se encontro el pais");
    }
  };
};

const countryDetail = (id) => {
  return async (dispatch) => {
    try {
      const endpoint = `/countries/${id}`;
      const { data } = await axios.get(endpoint);
      dispatch({
        type: COUNTRYDETAIL,
        payload: data,
      });
    } catch (error) {
      console.log(error)
    }
  };
};

const createActivity = (activity) => {
  return async (dispatch) => {
    try {
     const endpoint = "/activities";
     const {data} = await axios.post(endpoint, activity);
      alert("La actividad se creo correctamente");
    } catch (error) {
      console.log(error);
    }
  };
};

const filterCards = (value) => {
  return {
    type: FILTERCARDS,
    payload: value,
  };
};

const allActivities = () => {
  return async (dispatch) => {
    try {
      const endpoint = "/activities";
      const { data } = await axios.get(endpoint);
      dispatch({
        type: ALLACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const filterCountriesActivities = (value) => {
  return (dispatch) => {
    try {
      dispatch({
        type: FILTERCOUNTRIESACTIVITIES,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const orderCountries = (value) => {
  return (dispatch) => {
    try {
      dispatch({
        type: ORDERCARS,
        payload: value
      });
    } catch (error) {
      console.log(error);
    }
  };
};

 const deleteCountryDetail = ()=>{
   return (dispatch) =>{
     try {
       dispatch({
         type: DELETECOUNTRYDETAIL,
     })
     } catch (error) {
      
     }
   }
 }

export {
  allCountries,
  countryName,
  countryDetail,
  createActivity,
  filterCards,
  allActivities,
  filterCountriesActivities,
  orderCountries,
  deleteCountryDetail
};
