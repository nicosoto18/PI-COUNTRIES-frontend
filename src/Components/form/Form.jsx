import style from "./Form.module.css";
import { useState } from "react";
import { createActivity } from "../redux/actions";
import { useDispatch } from "react-redux";
import Validation from "../validation/validation";
import axios from "axios";
import { useEffect } from "react";

const Form = () => {
  const dispatch = useDispatch();

  // useEffect(()=>{

  // },[handleSubmit])

  const [initialActivity, setInitialActivity] = useState({
    Nombre: "",
    Dificultad: "",
    Duracion: "",
    Temporada: "Verano",
    Paises: [],
  });

  const [Activity, setActivity] = useState({ ...initialActivity });
  const [paisABuscar, setpaisABuscar] = useState("");
  const [errors, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Paises") {
      setpaisABuscar(value);
    } else if (name === "Dificultad") {
      const dificultad = parseInt(value);
      setActivity(() => ({
        ...Activity,
        [name]: dificultad,
      }));
    } else if (name === "Duracion") {
      const duracion = parseFloat(value);
      setActivity(() => ({
        ...Activity,
        [name]: duracion,
      }));
    } else {
      setActivity(() => ({
        ...Activity,
        [name]: value,
      }));
    }

    const validationErrors = Validation({
      ...Activity,
      [event.target.name]: event.target.value,
    });
    setError(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert("por favor, completa todos los campos correctamente");
    } else {
      console.log("llamando a la action createActivity");
      dispatch(createActivity(Activity));
      console.log(initialActivity);
      setActivity(initialActivity);
      setpaisABuscar("");
    }
  };

  const handleClickAgregar = async (event) => {
    try {
      const endpoint = `http://localhost:3001/countriesByName?name=${paisABuscar}`;
      const { data } = await axios.get(endpoint);
      let paisDuplicado = Activity.Paises.find((pais) => {
        return pais === data.Id;
      });

      if (!data) {
        return alert("El pais no fue encontrado");
      }
      if (paisDuplicado !== undefined) {
        return alert("Ese pais ya fue agregado recientemenete");
      } else {
        setActivity((Activity) => ({
          //prev activity para tomar el estado actual
          ...Activity,
          Paises: [...Activity.Paises, data.Id],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //eliminar paises agregados
  const onClose = (idPais) => {
    setActivity({
      ...Activity,
      Paises: Activity.Paises.filter((pais) => {
        return pais !== idPais;
      }),
    });
    setPaisPasadoPorEncima(null);
  };

  const [paisPasadoPorEncima, setPaisPasadoPorEncima] = useState(null);

  const handleMouseOver = (countryId) => {
    setPaisPasadoPorEncima(countryId);
  };

  const handleMouseOut = () => {
    setPaisPasadoPorEncima(null);
  };

  return (
    <div className={style.contenedor}>
      <form onSubmit={handleSubmit} className={style.formulario}>
        <div className={style.nombre}>
          <label htmlFor="nombre">Nombre </label>
          <input
            type="text"
            id="nombre"
            onChange={handleChange}
            name="Nombre"
            placeholder="Ingrese un nombre"
            value={Activity.Nombre}
          />
          {errors.n1 ? <p>{errors.n1}</p> : null}
        </div>

        <div className={style.dificultad}>
          <label htmlFor="dificultad"> Dificultad: </label>
          <input
            type="text"
            id="dificultad"
            onChange={handleChange}
            name="Dificultad"
            placeholder="Ingrese un numero entre 1 y 5"
            value={Activity.Dificultad}
          />
          {errors.d1 ? <p>{errors.d1}</p> : null}
          {errors.d2 ? <p>{errors.d2}</p> : null}
        </div>

        <div className={style.duracion}>
          <label htmlFor="duracion"> Duracion(en minuntos): </label>
          <input
            type="text"
            id="duracion"
            onChange={handleChange}
            name="Duracion"
            placeholder="120"
            value={Activity.Duracion}
          />
        </div>

        <div className={style.temporada}>
          <label htmlFor="temporada"> Temporada: </label>
          <select
            name="Temporada"
            id="temporada"
            onChange={handleChange}
            value={Activity.Temporada}
            className={style.ValorTemporada}
          >
            <option value="verano">Verano</option>
            <option value="invierno">Invierno</option>
            <option value="otoño">Otoño</option>
            <option value="primavera">Primavera</option>
          </select>
        </div>

        <div className={style.paises}>
          <label htmlFor="paises"> Pais: </label>
          <input
            type="text"
            id="paises"
            onChange={handleChange}
            name="Paises"
            placeholder="nombre de pais"
            value={paisABuscar}
          />
        </div>

        <div className={style.botones}>
          <button
            type="button"
            onClick={handleClickAgregar}
            name="Paises"
            className={style.btn}
          >
            Agregar
          </button>
          <button type="submit" className={style.btn} disabled={!errors}>
            Crear actividad
          </button>
        </div>

        <label htmlFor="paisesAgregados" className={style.labelEspecial}>
          Paises Agregados:
        </label>

        <div className={style.lista}>
          <ul>
            {Activity.Paises?.map((pais) => {
              return (
                <li
                  key={pais}
                  onClick={() => onClose(pais)}
                  onMouseOver={() => handleMouseOver(pais)}
                  onMouseOut={handleMouseOut}
                  className={paisPasadoPorEncima === pais ? style.hovered : ""}
                >
                  {paisPasadoPorEncima === pais ? "x" : pais}
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Form;
