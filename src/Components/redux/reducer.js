import { ALLCOUNTRIES,COUNTRYNAME,COUNTRYDETAIL,FILTERCARDS,ALLACTIVITIES,FILTERCOUNTRIESACTIVITIES,
         ORDERCARS,DELETECOUNTRYDETAIL} from "./actiontypes";

const initialState = {
    allCountries: [],
    filterCountries: [],
    countryDetail:[],
    allActivities: [],
    
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
       
      case ALLCOUNTRIES: 
               return {
                ...state,
                 allCountries: action.payload,
                 filterCountries:action.payload
                }; 
      case COUNTRYNAME:{
               return{...state,filterCountries:[action.payload]};
        }
      case COUNTRYDETAIL:    
      return{...state,countryDetail:action.payload};
                
      case ALLACTIVITIES:
            return{...state, allActivities: action.payload} 
      case FILTERCARDS:
          if(action.payload==="All"){
            return{
                ...state,
                filterCountries: state.allCountries
            }
          }
          const filtered = state.allCountries.filter((countries)=>{
            return countries.Continente === action.payload
          })
          return{
            ...state,
            filterCountries: filtered
          }
      case FILTERCOUNTRIESACTIVITIES:
            if(action.payload==="todas"){
              return{
                ...state,
                filterCountries: state.allCountries
              }
            }else{
            return{
              ...state,
              filterCountries: action.payload
            }
          }
      case ORDERCARS:
          const orderCopy = [...state.filterCountries];
          const orderAllCountries = [...state.allCountries];
            if(action.payload==="A"){
             orderCopy.sort((a,b)=>
             a.Nombre.localeCompare(b.Nombre))
             orderAllCountries.sort((a,b)=>
              a.Nombre.localeCompare(b.Nombre))           
            }
            if(action.payload==="D"){
              orderCopy.sort((a,b)=>b.Nombre.localeCompare(a.Nombre))
             orderAllCountries.sort((a,b)=> b.Nombre.localeCompare(a.Nombre))  }
          
            if(action.payload==="mayorPoblacion"){
              orderCopy.sort((a,b)=>b.Poblacion - a.Poblacion);
              orderAllCountries.sort((a,b)=>b.Poblacion - a.Poblacion)
            }
            if(action.payload==="menorPoblacion"){
             orderCopy.sort((a,b)=>a.Poblacion - b.Poblacion);
             orderAllCountries.sort((a,b)=>a.Poblacion-b.Poblacion);
            }

            return{
              ...state,
              allCountries: orderAllCountries,
              filterCountries: orderCopy
            }
        case DELETECOUNTRYDETAIL:
              return{
                ...state,
                countryDetail: []
              }
        default: return {...state};
    }
}



export default reducer;
