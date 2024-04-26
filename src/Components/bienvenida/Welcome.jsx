import { Link } from "react-router-dom";
import style from "./Welcome.module.css";
import imagen from "../imagenes/imagenMundo.jpg";

const Welcome = () => {
  return (
    <div className={style.Bienvenida}>
      <div className={style.ContenedorPpal}>
        <div className={style.imagen}>
          <img src={imagen} alt="imagen mundo" />
        </div>
        <div className={style.principal}>
          <h1> PI-Countries </h1>
          <h2>
            Explora información detallada sobre diferentes países y descubre
            actividades únicas! ¡Sumérgete en la diversidad cultural y
            geográfica del mundo!
          </h2>
          <Link to="/Home">
            <button className={style.ingresar}>Ingresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
