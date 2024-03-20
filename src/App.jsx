import "./App.css";
import { Routes, Route } from "react-router-dom";
//COMPONENTS
import Bienvenida from "./Components/bienvenida/Bienvenida";
import Home from "./Components/home/Home";
import CountryDetail from "./Components/CountryDetail/CountryDetail.jsx";
import Form from "./Components/form/Form";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  return (
    <div>
      <Routes>
       
        <Route path="/" element={<Bienvenida />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Detail/:id" element={<CountryDetail />} />
        <Route path="/Form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
