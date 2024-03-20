import style from "./Card.module.css"

const Card = ({ Nombre,Id,Capital,Subregion,Area,Poblacion,Imagen,}) =>{

  return (
    <div id={Id} className={style.contenedor} >
       
     <div className={style.texto}>
     {Nombre && <h2>{Nombre}</h2>}       
     <div className={style.capital}>{Capital && <p>capital: </p>} <h3>{Capital}</h3></div> 
     <div className={style.subregion}> {Subregion && <p>Subregion:</p>}<h3>{Subregion}</h3></div>
     <div className={style.area}>{Area && <p>Area:</p>}<h3>{Area}</h3></div> 
     <div className={style.poblacion}>{Poblacion && <p>Poblacion:</p>}<h3>{Poblacion}</h3></div> 
     </div>
    
     <div className={style.imagenn}>{Imagen && <img src={Imagen} alt="Img" />}</div>  

    </div>
   
  );
};

export default Card;
