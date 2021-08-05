import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { nanoid } from "nanoid";
import Error from './Error';


const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false)

    //CUANDO EL USUARIO AGREGA UN GASTO
    const agregarGasto = e => {
        e.preventDefault();

        //VALIDAR
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() === '' ){
            guardarError(true);
            return;
        }
        guardarError(false);

        //CONSTRUIR EL GASTO
        const gasto = {
            nombre,
            cantidad,
            id: nanoid()
        }

        //PASAR EL GASTO AL COMPONENTE PRINCIPAL
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //RESETEAR EL FORMULARIO
        guardarNombre('');
        guardarCantidad(0);
    }
    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>

            { error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto" /> : null }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ejm. Transporte"
                    value={nombre}
                    onChange={ e => guardarNombre(e.target.value) }
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ejm. 300"
                    value={cantidad}
                    onChange={ e => guardarCantidad( parseInt(e.target.value) ) }
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;