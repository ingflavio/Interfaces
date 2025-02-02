import Field from './Field';
import React, { useState } from 'react';

const  handleClick = async (event) => {
  event.preventDefault();
  console.log(formValues)

  // URL del servidor al que deseas enviar el JSON
  const url = 'https://example.com/api';

  // Datos JSON que deseas enviar
  const data = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 30
  };
  
  // Configuración de la solicitud fetch
  const options = {
    method: 'POST', // Método de la solicitud (POST, en este caso)
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido
    },
    body: JSON.stringify(data) // Datos JSON convertidos a string
  };

  // Envío de la solicitud fetch
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json(); // Parsear la respuesta JSON
      }
      throw new Error('Error en la solicitud');
    })
    .then(data => {
      console.log('Respuesta del servidor:', data); // Manejar la respuesta del servidor
    })
    .catch(error => {
      console.error('Error:', error); // Manejar errores
    });

};

let TextFields = [
  "Nombre",
  "Apellido",
  'Profesion',
  'Web'
]


export const FormTable = () => {
  const [formValues, setFormValues] = useState({});

  const handleFieldChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  }; 

  const initialFormValues = TextFields.reduce((acc, field) => {
    acc[field] = '';
    return acc;
  }, {});

    return(
        <div className="form-table">
            <form action="" method="post" id="formulario">
                <fieldset className="seccionesForm">
                    <label className="titulos">Datos Personales</label>
                    {TextFields.map((nombre, index) => (
                      <Field
                        key={index}
                        name={nombre}
                        value={formValues[nombre] || ''}
                        onChange={(value) => handleFieldChange(nombre, value)}
                      />
                    ))}
                    <div className="divTlf">
                    <label className="labels">Telefono</label>
                    <div className="divNroTlf">
                        <select name="tipoTlf" id="tipoTlf">
                        <option value="412">0412</option>
                        <option value="414">0414</option>
                        <option value="416">0416</option>
                        <option value="424">0424</option>
                        <option value="424">0426</option>
                        </select>
                        <input type="tel" name="inputTlf" id="inputTlf" className="inputs"/>
                    </div>
                    </div>
                    <label className="labels">Perfil</label>
                    <textarea name="areaPerfil" id="areaPerfil" placeholder="Describa un resumen de su perfil Profesional" rows="8" cols="50"></textarea>
                </fieldset>
                <fieldset className="seccionesForm idiomasSeccion">
                    <label className="titulos">Manejo de Idiomas</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Ingles" className="checkbox" /> Ingles</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Portugués" className="checkbox" /> Portugués</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Español" className="checkbox" /> Español</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Alemán" className="checkbox" /> Alemán</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Italiano" className="checkbox" /> Italiano</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Francés" className="checkbox" /> Francés</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Ruso" className="checkbox" /> Ruso</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Chino" className="checkbox" /> Chino</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Japones" className="checkbox" /> Japones</label>
                    <label className="labelIdiomas"><input type="checkbox" className="checkbox" value="Otro"/> Otro <input className="inputs" type="text" placeholder="Ingrese el Idioma"/></label>
                </fieldset>
                <fieldset className="seccionesForm">
                    <label className="titulos">Nivel de Habilidades</label>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Liderazgo</label><input type="range" name="rangeLiderazgo" id="rangeLiderazgo" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Creatividad</label><input type="range" name="rangeCreatividad" id="rangeCreatividad" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Analisis Crítico</label><input type="range" name="rangeAnalisis" id="rangeAnalisis" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Eficiencia</label><input type="range" name="rangeEficiencia" id="rangeEficiencia" min="0" max="5" value="0" step="1"/>
                    </section>
                </fieldset>
                <fieldset className="seccionesForm">
                  <label className="titulos">Experiencia Laboral</label>
                  <input type="text" className="inputs" placeholder="Nombre de Empresa"/>
                  <input type="number" className="inputs" placeholder="Año Inicio"/>
                  <input type="number" className="inputs" placeholder="Año Final"/>
                  <textarea name="areaExpLab" id="areaExpLab" placeholder="Experiencia obtenida" rows={10}></textarea>
                  <button id="btnExpLab">+</button>
                </fieldset>
                <fieldset className="seccionesForm">
                  <label className="titulos">Formación Académica</label>
                  <input type="text" className="inputs" placeholder="Nombre de Institución"/>
                  <input type="number" className="inputs" placeholder="Año Inicio"/>
                  <input type="number" className="inputs" placeholder="Año Final"/>
                  <input type="text" className="inputs" placeholder="Carrera o Curso obtenido"></input>
                  <button id="btnAcademica">+</button>
                </fieldset>
            </form>
        
        <table id="tabla-goms">
          <thead>
            <tr>
              <th className="operador">Operador</th>
              <th className="dato">Dato</th>
              <th className="contador-dato">P</th>
              <th className="contador-dato">H</th>
              <th className="contador-dato">K</th>
              <th className="contador-dato">M</th>
              <th className="contador-dato">B</th>
              <th className="contador-dato">Date-picker</th>
              <th className="contador-dato">Scrolling</th>
              <th className="contador-dato">D</th>
              <th className="contador-dato">R</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            </tbody>
        </table>
        <button type="submit" id='btnEnviarForm' onClick={handleClick}>Enviar</button>
    </div>
    )
}