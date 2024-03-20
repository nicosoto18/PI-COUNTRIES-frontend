const Validation=(data)=>{
const errors = {}

if(!data.Nombre){errors.n1 ="Ingrese un nombre"}


if(!data.Dificultad)
{errors.d1 = "Ingrese una dificultad";
}
else if(data.Dificultad>5 || data.Dificultad <1){
    errors.d2="Debe ser del 1 al 5"
}




return errors;
}

export default Validation;