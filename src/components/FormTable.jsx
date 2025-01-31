const  handleClick = async (event) => {
  event.preventDefault();

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


export const FormTable = () => {
    return(
        
        <div className="form-table">
            <form action="" method="post" id="formulario">
                <fieldset className="seccionesForm">
                    <label className="titulos">Datos Personales</label>
                    <input type="text" name="inputNombre" id="inputNombre" className="inputs" placeholder="Ingrese Nombre"/>
                    <input type="text" name="inputApellido" id="inputApellido" className="inputs" placeholder="Ingrese Apellido"/>
                    <input type="email" name="inputEmail" id="inputEmail" className="inputs" placeholder="Ingrese Email"/>
                    <input type="text" name="inputProfesion" id="inputProfesion" className="inputs" placeholder="Ingrese Profesion"/>
                    <input type="text" name="inputSitioWeb" id="inputSitioWeb" className="inputs" placeholder="Ingrese Sitio Web"/>
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
                    <label for="" className="labels">Perfil</label>
                    <textarea name="areaPerfil" id="areaPerfil" placeholder="Describa un resumen de su perfil Profesional" rows="8" cols="50"></textarea>
                </fieldset>
                <fieldset className="seccionesForm idiomasSeccion">
                    <label for="" className="titulos">Manejo de Idiomas</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Ingles" className="checkbox"/> Ingles</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Portugués" className="checkbox"/> Portugués</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Español" className="checkbox"/> Español</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Alemán" className="checkbox"/> Alemán</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Italiano" className="checkbox"/> Italiano</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Francés" className="checkbox"/> Francés</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Ruso" className="checkbox"/> Ruso</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Chino" className="checkbox"/> Chino</label>
                    <label className="labelIdiomas"><input type="checkbox" value="Japones" className="checkbox"/> Japones</label>
                    <label className="labelIdiomas"><input type="checkbox" className="checkbox" value="Otro"/> Otro <input className="inputs" type="text" placeholder="Ingrese el Idioma"/></label>
                </fieldset>
                <fieldset className="seccionesForm">
                    <label for="" className="titulos">Nivel de Habilidades</label>
                    <section className="seccionRango">
                    <label for="" className="labelHabilidades">Liderazgo</label><input type="range" name="rangeLiderazgo" id="rangeLiderazgo" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label for="" className="labelHabilidades">Creatividad</label><input type="range" name="rangeCreatividad" id="rangeCreatividad" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label for="" className="labelHabilidades">Analisis Crítico</label><input type="range" name="rangeAnalisis" id="rangeAnalisis" min="0" max="5" value="0" step="1"/>
                    </section>
                    <section className="seccionRango">
                    <label for="" className="labelHabilidades">Eficiencia</label><input type="range" name="rangeEficiencia" id="rangeEficiencia" min="0" max="5" value="0" step="1"/>
                    </section>
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
    </div>
    )
}