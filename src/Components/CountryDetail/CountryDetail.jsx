import style from "./countryDetail.module.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countryDetail } from "../redux/actions";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { deleteCountryDetail } from "../redux/actions";

const CountryDetail = () => {
  const { id } = useParams();
  const detail = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  const hayActividad = detail.Activities?.length;

  useEffect(() => {
    dispatch(countryDetail(id));
    return dispatch(deleteCountryDetail())
  }, [id]);

  return (
    <div className={style.contenedor}>
      <div className={style.btBack}>
        <Link to="/Home">
          <button>back</button>
        </Link>
      </div>

      <div className={style.card}>
        <Card
          Nombre={detail.Nombre}
          Id={detail.Id}
          Continente={detail.Continente}
          Capital={detail.Capital}
          Subregion={detail.Subregion}
          Area={detail.Area}
          Poblacion={detail.Poblacion}
          Imagen={detail.Imagen}
        />
      </div>
      {hayActividad ? (
        <div className={style.Actividades}>
          <div className={style.titulo}>
            <h2>Actividades destacadas en este país</h2>
          </div>
          {detail.Activities.map((activity,index) => (
            
            <div className={style.actividad} key={index}>
              <h2>{activity.Nombre}</h2>
              <h3>Temporada: {activity.Temporada}</h3>
              <h3>Duracion: {activity.Duracion} minutos</h3>
              <h3>Dificultad(1-5): {activity.Dificultad}</h3>
            </div>
          ))}
        </div>
      )  : null}
    </div>
  );
};

export default CountryDetail;
