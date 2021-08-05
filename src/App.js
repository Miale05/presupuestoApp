import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {
  
  //DEFINIR EL STATE
  const [ presupuesto, guardarPresupuesto ] = useState(0);
  const [ restante, guardarRestante ] = useState(0);
  const [ mostrarpregunta, actualizarPregunta ] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);

  // UseEffect QUE ACTUALIZA EL RESTANTE
  useEffect(() => {
    if(creargasto) {

      //AGREGA AL NUEVO PRESUPUESTO
      guardarGastos([
        ...gastos,
        gasto
      ]);

      //RESTA DEL PRESUPUESTO ACTUAL
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //RESETEAR A FALSE
      guardarCrearGasto(false);
    }
  }, [gasto, creargasto, gastos, restante]);

  
  
  return (
      <div className="container">
        <header>
          <h1>Presupuesto App</h1>

          <div className="contenido-principal contenido">
            
            { mostrarpregunta ? 
              (
                <Pregunta 
                  guardarPresupuesto={guardarPresupuesto}
                  guardarRestante={guardarRestante}
                  actualizarPregunta={actualizarPregunta}
                />
              )  : (
                <div className="row">
                  <div className="one-half column">
                    <Formulario 
                      guardarGasto={guardarGasto}
                      guardarCrearGasto={guardarCrearGasto}
                    />
                  </div>

                  <div className="one-half column">
                    <Listado 
                      gastos={gastos}
                    />

                    <ControlPresupuesto
                      presupuesto={presupuesto}
                      restante={restante}
                    />
                  </div>
                </div>
              ) 
            }

          </div> <br/>
          
          <div className="contenido-principal contenido">
            <h2>¿Cómo Funciona?</h2>
            <li className="lista-instruccion">Tu saldo <span className="alert alert-success">Restante</span> se irá disminuyendo y cambiando de color, conforme vayas registrando tus <span className="gasto-instruccion">Gastos</span> . </li>
            <li className="lista-instruccion">Cuando tu saldo restante esté por encima del 50% de tu Presupuesto, este será de color <span className="alert alert-success">Verde</span> .</li>
            <li className="lista-instruccion">Cuando tu saldo restante esté por debajo del 50% de tu Presupuesto, este será de color <span className="alert alert-warning">Amarillo</span> .</li>
            <li className="lista-instruccion">Cuando tu saldo restante esté por debajo del 25% de tu Presupuesto, este será de color <span className="alert alert-danger">Rojo</span> .</li>
          </div>
        
        </header>
      </div>
  );
}

export default App;
