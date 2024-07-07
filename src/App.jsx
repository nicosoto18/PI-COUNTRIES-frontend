import { Routes, Route } from "react-router-dom";
//COMPONENTS
import Welcome from "./Components/bienvenida/Welcome.jsx";
import Home from "./Components/home/Home";
import CountryDetail from "./Components/CountryDetail/CountryDetail.jsx";
import Form from "./Components/form/Form";
import axios from "axios";
axios.defaults.baseURL = "https://pi-countries-backend-2.onrender.com"

function App() {
  return (
    <div >
      <Routes>
       
        <Route path="/" element={<Welcome/>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Detail/:id" element={<CountryDetail />} />
        <Route path="/Form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
