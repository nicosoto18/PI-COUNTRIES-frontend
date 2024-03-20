import { Link } from "react-router-dom";
import style from "./Bienvenida.module.css"
import imagen from "../imagenes/imagenMundo.jpg"

const Bienvenida = ()=>{
  return(
     <>
     <div className={style.imagen}>
      <img src={imagen} alt="imagen mundo" />
      </div>
      <div className={style.principal}>
       <h1> PI-Countries </h1> 
       <p>
       Explora información detallada sobre diferentes países y descubre actividades únicas!
       ¡Sumérgete en la diversidad
       cultural y geográfica del mundo!
       </p>
        <Link to="/Home"><button className={style.ingresar}>Ingresar</button></Link>
    </div>
     </>
  )
}

export default Bienvenida;