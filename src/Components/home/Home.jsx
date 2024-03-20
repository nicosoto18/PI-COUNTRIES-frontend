import style from "./Home.module.css";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchBar from "../searchbar/searchBar";
import {allCountries, filterCards,allActivities,filterCountriesActivities, orderCountries,} from "../redux/actions";
  
const Home = () => {
  const dispatch = useDispatch();
  const filterCountriesData = useSelector((state) => state.filterCountries);
  const AllActivities = useSelector((state) => state.allActivities);
  const allCountriesData = useSelector((state) => state.allCountries);

  useEffect(() => {
    dispatch(allCountries());
    dispatch(allActivities());
  }, [dispatch]);

  const handleFilter = (event) => {
    const { value } = event.target;
    dispatch(filterCards(value));
    setCurrentPage(1);
  };

  const handleChangeActivity = (event) => {
    const { value } = event.target;
    console.log("EL VALUE ES", value)
    if (value === "todas") {
      dispatch(filterCountriesActivities(value));
    } else {
      const paisesConActividades = allCountriesData.filter(
        (country) => country.Activities.length > 0
      );
      const paisesFiltrados = [];
      for (const pais of paisesConActividades) {  //recorro cada pais que tenga al menos 1 actividad
        for (const activity of pais.Activities) { //recorro cada actividad que tenga el pais         
          if (activity.Id == value) {
            paisesFiltrados.push(pais);
          }
        }
      }
      if (paisesFiltrados.length > 0) {
        console.log(paisesFiltrados);
        return dispatch(filterCountriesActivities(paisesFiltrados));
      }
      return alert("No se encontro en ningun pais esa actividad");
    }
  };

  const handleOrder = (event) => {
    const { value } = event.target;
    dispatch(orderCountries(value));
    setCurrentPage(1);
  };

  const ITEMS_PER_PAGE = 10 ;
  
  const [currentPage, setCurrentPage] = useState(1); //manejar la pagina actual
  
  const handlePageChange=(newPage)=>{
    if(newPage>=1 && newPage<= totalPages){
      setCurrentPage(newPage)
    }
  }

  const calculateTotalPages = ()=>{
    return Math.ceil(filterCountriesData.length/ITEMS_PER_PAGE ) //funcion para calcular el nro total de paginas
  }

  const startIndex = (currentPage-1) * ITEMS_PER_PAGE; //calcula indice de inicio 
  const endIndex = startIndex + ITEMS_PER_PAGE         //calcula fin de los paises a mostrar en la pag 

  const displayedCountries = filterCountriesData.slice(startIndex,endIndex) //traeme los paises segun la pagina actual

  const totalPages = calculateTotalPages(); //nro total de paginas



  return (
    <div className={style.Home}>
     <div className={style.navegacion}>
        <Link to="/">
          <button>Volver</button>
        </Link>

        <select name="order" onChange={handleFilter}>

          <option hidden>Continentes</option>
          <option value="All">Todos los continentes</option>
          <option value="South America">America del Sur</option>
          <option value="North America">America del Norte</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select name="oder" onChange={handleOrder}>
          <option hidden>Orden</option>
          <option value="A">Ascendente</option>
          <option value="D">Descendente</option>

          <option value="mayorPoblacion">Mayor poblacion</option>
          <option value="menorPoblacion">Menor poblacion</option>
       </select>

        <select name="filterActividad" onChange={handleChangeActivity}>
          <option value="" disabled>Actividades</option>  
          <option value="todas">Todas las actividades</option>
          {AllActivities.length>0?AllActivities.map((activity,index) => (
            <option value={activity.Id} key={index}>{activity.Nombre}</option>
          ))
         :null
        }
        </select>

        <Link to="/Form">
          <button>Crear Actividad</button>
        </Link>
        
        <SearchBar/>
      
      </div>
      <div className={style.contenedorHome}>

          <div className={style.contenedorPaginado}>    
          <div className={style.contenedorButtons}>
       <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1} className={style.btPaginado}>
       👈
        </button>
        <span>{currentPage} de {totalPages}</span>
       <button onClick={()=>handlePageChange(currentPage+1)} disabled={currentPage===totalPages} className={style.btPaginado}>
        👉
        </button>
            </div> 
        </div>
        
        <div className={style.lasCard} >
      {displayedCountries.map((country,index) => (
        <div className={style.cardIndividual} key={index}>
          <div className={style.contenedorTituloCard}>
          <h2>{<Link className={style.Linkk} 
              to={`/Detail/${country.Id}`}>{country.Nombre}</Link>}
          </h2>
          </div>
          <h3>{country.Continente}</h3>
          <img src={country.Imagen} alt="img"/>
        </div>
       ))}
                
   </div>
       </div>
      
    </div>
  );
};

export default Home;

