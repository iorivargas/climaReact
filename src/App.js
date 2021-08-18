import React, {Fragment, useState, useEffect} from 'react';
//componentes
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  
  //state del formulario
  const [busqueda, saveBusqueda] = useState({
    ciudad: '',
    pais: ''
});

  //state dela consulta
  const [consultar, saveConsultar] = useState(false);

  // state para guardar la consulta
  const [resultado , saveResultado] = useState({});

  //state para el error en la consulta
  const [error,saveError] = useState(false);

  //extraer ciudad y pais
  const {ciudad,pais} = busqueda;

  useEffect(() => {

    if (consultar){

      const consultarApi = async () => {
        
        const APIkey = '0d668973fe0bd8cc8042ac8e9fb92eaa';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIkey}`;
        
        const response = await fetch(url);
        const result = await response.json();
  
        saveResultado(result);
        saveConsultar(false);
        
        //Detectamos si no existen errorres en la consulta
        if (resultado.cod === "404") {
          saveError(true);
        } else{
          saveError(false);
        }
      }
      consultarApi();
    }
    
  },[consultar,ciudad, pais, resultado.cod]);

  let componente;

  if(error){
    componente = <Error mensaje="No hay resultados" />
  } else{
    componente = <Clima
                  resultado={resultado}
                />
  }

  return (
    <Fragment>
      <Header
        titulo="Clima React"
      />
        <div className="contenedor-form">
            <div className="container">
              <div className="row">
                <div className="col m6 s12">
                  <Formulario
                    busqueda={busqueda}
                    saveBusqueda={saveBusqueda}
                    saveConsultar={saveConsultar} 
                  />
                  
                </div>
                <div className="col m6 s12">
                    
                    {componente}
                    
                </div>
              </div>
            </div>
        </div>


    </Fragment>

  );
}

export default App;
