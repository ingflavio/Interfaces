import Field from './Field';
import React, { useState } from 'react';

const  handleClick = async (event) => {
  event.preventDefault();

  const arrayCheckBox = document.querySelectorAll('.checkbox');
  const idiomas = []

  console.log(arrayCheckBox)

  for(const e of arrayCheckBox){
    if(e.checked){
      idiomas.push(e.value)
    }
  }

  const data = {
    'nombre': document.querySelector('#inputNombre').value,
    'apellido' : document.querySelector('#inputApellido').value,
    'profesion' : document.querySelector('#inputProfesion').value,
    // 'foto': document.querySelector('#inputFoto').value,
    'telefono' : `${document.querySelector('#tipoTlf').value} ${document.querySelector('#inputTlf').value}` ,
    'correo' : document.querySelector('#inputNombre').value,
    'paginaWeb' : document.querySelector('#inputWeb').value,
    'perfil' : document.querySelector('#areaPerfil').value,
    'idiomas' : idiomas,
    'competencias' : '',
    'habilidades' : '',
    'experienciasLab' : arrayListaLaboral,
    'formacionAcademica' : '',
  }

  alert(JSON.stringify(data))

  // URL del servidor al que deseas enviar el JSON
  // const url = 'https://example.com/api';

  // Datos JSON que deseas enviar

  
  // Configuración de la solicitud fetch
  const options = {
    method: 'POST', // Método de la solicitud (POST, en este caso)
    headers: {
      'Content-Type': 'application/json' // Tipo de contenido
    },
    body: JSON.stringify(data) // Datos JSON convertidos a string
  };

  // Envío de la solicitud fetch
  // fetch(url, options)
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json(); // Parsear la respuesta JSON
  //     }
  //     throw new Error('Error en la solicitud');
  //   })
  //   .then(data => {
  //     console.log('Respuesta del servidor:', data); // Manejar la respuesta del servidor
  //   })
  //   .catch(error => {
  //     console.error('Error:', error); // Manejar errores
  //   });

};

let TextFields = [
  "Nombre",
  "Apellido",
  'Profesion',
  'Web'
]
const arrayListaLaboral = [];
const arrayListaAcademica = [];

const añadirExpLab = (event) => {
  event.preventDefault();

  const nombreEmpresa = document.querySelector("#inputNombreEmpresaLaboral"),
        añoInicioLab = document.querySelector("#inputAñoIniLaboral"),
        añoFinLab = document.querySelector("#inputAñoFinLaboral"),
        experenciaLaboral = document.querySelector("#areaExpLab"),
        listaLaboral = document.querySelector(".listaExpLaboral");
  
  const arrayDatosLaboral = [nombreEmpresa, añoInicioLab, añoFinLab, experenciaLaboral];

  
  if (arrayDatosLaboral.every(element => element.value != "")){
    arrayListaLaboral.push({
      empresaNombre : nombreEmpresa.value,
      añoInicial : añoInicioLab.value,
      añoFinal : añoFinLab.value,
      experiencia : experenciaLaboral.value,
    });
  
    let label = document.createElement('label')
    label.innerText = nombreEmpresa.value
    label.classList.add("labelListas")
    listaLaboral.appendChild(label)
    console.log(arrayListaLaboral)
  }

  nombreEmpresa.value = "";
  añoInicioLab.value = "";
  añoFinLab.value = "";
  experenciaLaboral.value = "";

};

const añadirFormAcademi = (event) => {
  event.preventDefault();

  const nombreInstitucion = document.querySelector("#inputNombreInstAcademica"),
        añoInicioAcademico = document.querySelector("#inputAñoIniAcademico"),
        añoFinAcademico = document.querySelector("#inputAñoFinAcademico"),
        carrera = document.querySelector("#inputCarrera"),
        listaAcademica = document.querySelector(".listaAcademica");
  
  const arrayDatosAcademicos = [nombreInstitucion, añoInicioAcademico, añoFinAcademico, carrera];


  if (arrayDatosAcademicos.every(element => element.value != "")){
    arrayListaAcademica.push({
      academiaNombre : nombreInstitucion.value,
      añoInicial : añoInicioAcademico.value,
      añoFinal : añoFinAcademico.value,
      carreraObtenida : carrera.value,
    });
  
    let label = document.createElement('label')
    label.innerText = nombreInstitucion.value
    label.classList.add("labelListas")
    listaAcademica.appendChild(label)
    console.log(arrayListaAcademica)
  }

  nombreInstitucion.value = "";
  añoInicioAcademico.value = "";
  añoFinAcademico.value = "";
  carrera.value = "";
  
};

// const añadirCompetencia = (event) => {
//   event.preventDefault();

//   #inputCompetenciaObt
//   #rangeCompetencia
//   .listaCompetencia
  
  
// };

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

  const [fixedRangeValues, setFixedRangeValues] = useState({
    "liderazgo": 0,
    'creatividad': 0,
    'analisis': 0,
    'eficiencia': 0
  });

  const [dynamicRangeValues, setDynamicRangeValues] = useState([0]);

  const handleFixedRangeChange = (name, value) => {
    console.log('ueu')
      setFixedRangeValues((prevValues) => ({
          ...prevValues,
          [name]: value
      }));
  };

  const handleDynamicRangeChange = (index, value) => {
    console.log('ueu')
      const newValues = [...dynamicRangeValues];
      newValues[index] = value;
      setDynamicRangeValues(newValues);
  };

  const addNewRange = () => {
      setDynamicRangeValues((prevValues) => [...prevValues, 0]);
  };

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
                    <label className="labelHabilidades">Liderazgo</label><input type="range" name="rangeLiderazgo" id="rangeLiderazgo" min={0} max={5} step={1} value={fixedRangeValues.liderazgo} onChange={handleFixedRangeChange}/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Creatividad</label><input type="range" name="rangeCreatividad" id="rangeCreatividad" min={0} max={5} step={1} value={fixedRangeValues.creatividad} onChange={handleFixedRangeChange}/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Analisis Crítico</label><input type="range" name="rangeAnalisis" id="rangeAnalisis" min={0} max={5} step={1} value={fixedRangeValues.analisis} onChange={handleFixedRangeChange}/>
                    </section>
                    <section className="seccionRango">
                    <label className="labelHabilidades">Eficiencia</label><input type="range" name="rangeEficiencia" id="rangeEficiencia" min={0} max={5} step={1} value={fixedRangeValues.eficiencia} onChange={handleFixedRangeChange}/>
                    </section>
                </fieldset>
                <fieldset className="seccionesForm">
                  <label className="titulos">Experiencia Laboral</label>
                  <input type="text" className="inputs" id='inputNombreEmpresaLaboral' placeholder="Nombre de Empresa"/>
                  <input type="number" className="inputs" id='inputAñoIniLaboral' placeholder="Año Inicio"/>
                  <input type="number" className="inputs" id='inputAñoFinLaboral' placeholder="Año Final"/>
                  <textarea name="areaExpLab" id="areaExpLab" placeholder="Experiencia obtenida" rows={10}></textarea>
                  <div className="listaExpLaboral"></div>
                  <button id="btnExpLab" onClick={añadirExpLab}>+</button>
                </fieldset>
                <fieldset className="seccionesForm">
                  <label className="titulos">Formación Académica</label>
                  <input type="text" className="inputs" id='inputNombreInstAcademica' placeholder="Nombre de Institución"/>
                  <input type="number" className="inputs" id='inputAñoIniAcademico' placeholder="Año Inicio"/>
                  <input type="number" className="inputs" id='inputAñoFinAcademico' placeholder="Año Final"/>
                  <input type="text" className="inputs" id='inputCarrera' placeholder="Carrera o Curso obtenido"></input>
                  <div className="listaAcademica"></div>
                  <button id="btnAcademica" onClick={añadirFormAcademi}>+</button>
                  
                </fieldset>
                <fieldset className="seccionesForm">
                  <label className="titulos">Competencias</label>
                  <input type="text" className="inputs" id='inputCompetenciaObt' placeholder="Competencia Obtenida"/>
                  <label className="labelCompetencias">Nivel de competencia</label>
                  <input type="range" name="rangeCompetencia" id="rangeCompetencia" min={0} max={5} step={1} value={dynamicRangeValues} onChange={handleDynamicRangeChange}/>
                  <div className="listaCompetencia"></div>
                  <button id="btnCompetencia" >+</button>
                  {/* onClick={añadirCompetencia} */}
                </fieldset>
                <button type="submit" id='btnEnviarForm' onClick={handleClick}>Enviar</button>
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
    </div>
    )
}