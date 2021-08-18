import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error'

const Formulario = ({busqueda, saveBusqueda, saveConsultar}) => {

    //State para el mensaje de error
    const [error, saveError] = useState(false);

    //extraer ciudad y pais
    const {ciudad,pais} = busqueda;

    //function que coloca los elementos en el state
    const handleChange = e => {
        //actualizar el state
        saveBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //function cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault();
        
        //Validar
        if (ciudad.trim() === ''|| pais.trim() === ''){
            saveError(true);
            return;
        }
        saveError(false);

        //pasar los valores al componente principal
        saveConsultar(true)
    }

    return ( 
    
        <form
        onSubmit={handleSubmit}
        >
            { error 
                ? 
                    <Error 
                        mensaje="Ambos campos son obligatorios"
                    /> 
                : 
                    null 
            }

            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>

            <div className="input-field col s12" >
                <select
                    name='pais'
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                        <option value="">--- Seleccione un pais</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>

                </select>
                <label htmlFor="pais">Pais: </label>
            </div>
            <div className="input-field col s12">
                <button 
                    type="submit" 
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                >Buscar Clima</button>
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    saveBusqueda: PropTypes.func.isRequired,
    saveConsultar: PropTypes.func.isRequired
}
 
export default Formulario;