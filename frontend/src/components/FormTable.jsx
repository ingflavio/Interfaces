import { useState } from "react";

export const FormTable = () => {
  const [formBody, setFormBody] = useState({
    nombre: "",
    apellido: "",
    profesion: "",
    telefonoPrefijo: "0424",
    telefonoNumero: "",
    correo: "",
    paginaweb: "",
    perfil: "",
    idiomas: [],
    competencia: [],
    habilidades: [],
    experiencialaboral: [],
    formacion: [],
  });

  const [idioma, setIdioma] = useState([{ id: 1, idioma: "" }]);
  const [competencia, setCompetencia] = useState([
    { id: 1, competencia: "", porcentaje: "" },
  ]);
  const [habilidad, setHabilidad] = useState([
    { id: 1, habilidad: "", porcentaje: "" },
  ]);
  const [experiencia, setExperiencia] = useState([
    {
      id: 1,
      experiencia: "",
      descripcion: "",
      fechaInicial: "",
      fechaFinal: "",
    },
  ]);
  const [formacion, setFormacion] = useState([
    {
      id: 1,
      formacion: "",
      descripcion: "",
      fechaInicial: "",
      fechaFinal: "",
    },
  ]);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    console.log(formBody);
    setFormBody((prev) => ({ ...prev, [id]: value }));
  };

  const addElement = (setState, key) => {
    setState((prev) => [...prev, { id: prev.length + 1, [key]: "" }]);
  };

  const removeLastElement = (setState) => {
    setState((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleTodoList = (e, setState, key, index) => {
    const { value } = e.target;
    console.log(formacion);
    setState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleSubmit = () => {
    setFormBody((prevFormBody) => ({
      ...prevFormBody,
      idiomas: idioma.map((item) => item),
      competencia: competencia.map((item) => item),
      habilidades: habilidad.map((item) => item),
      experiencialaboral: experiencia.map((item) => item),
      formacion: formacion.map((item) => item),
    }));

    console.log(formBody);
  };

  return (
    <div className="container-fluid h-100 w-100 bg-black contentDashboard">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="container form-group bg-white mt-3 p-3 rounded-3 p-0">
            <h2 className="text-center">Registrar Datos</h2>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Nombre
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    className="form-control"
                    id="nombre"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Apellido
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    className="form-control"
                    id="apellido"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Profesión
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    className="form-control"
                    id="profesion"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono
                  </label>
                  <div className="input-group">
                    <select
                      className="form-select"
                      style={{ maxWidth: "80px" }}
                      id="telefonoPrefijo"
                      value={formBody.telefonoPrefijo}
                      onChange={handleFormChange}
                    >
                      <option value="0424">0424</option>
                      <option value="0412">0412</option>
                      <option value="0414">0414</option>
                      <option value="0416">0416</option>
                    </select>
                    <input
                      type="number"
                      className="form-control"
                      id="telefonoNumero"
                      value={formBody.telefonoNumero}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Correo
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="email"
                    className="form-control"
                    id="correo"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Pagina Web
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    className="form-control"
                    id="paginaweb"
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Perfil
                  </label>
                  <input
                    onChange={handleFormChange}
                    type="text"
                    className="form-control"
                    id="perfil"
                  />
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Idiomas
                  </label>
                  {idioma.map((item, index) => (
                    <input
                      key={index}
                      onChange={(e) =>
                        handleTodoList(e, setIdioma, "idioma", index)
                      }
                      type="text"
                      className="form-control mb-3"
                      name="idioma"
                      id={`idioma-${index}`}
                      placeholder={`Idioma ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="submitButton">
                  <button
                    onClick={() => removeLastElement(setIdioma)}
                    className="btn btn-danger text-end m-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addElement(setIdioma, "idioma")}
                    className="btn btn-success text-end my-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Competencia
                  </label>

                  {competencia.map((item, index) => (
                    <div key={index} className="col-12 col-md-12">
                      <div className="row">
                        <div className="col-10">
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setCompetencia,
                                "competencia",
                                index
                              )
                            }
                            type="text"
                            className="form-control mb-3"
                            name="competencia"
                            id={`competencia-${index}`}
                            placeholder={`Competencia ${index + 1}`}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setCompetencia,
                                "porcentaje",
                                index
                              )
                            }
                            id={`barra${index}`}
                            type="number"
                            className="form-control mb-3"
                            placeholder="%"
                            min="1"
                            max="100"
                            onInput={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value < 1) e.target.value = 1;
                              if (value > 100) e.target.value = 100;
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="submitButton">
                  <button
                    onClick={() => removeLastElement(setCompetencia)}
                    className="btn btn-danger text-end m-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addElement(setCompetencia, "competencia")}
                    className="btn btn-success text-end m-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="mb-3">
                  <label htmlFor="#" className="form-label">
                    Habilidades
                  </label>
                  {habilidad.map((item, index) => (
                    <div key={index} className="col-12 col-md-12">
                      <div className="row">
                        <div className="col-10">
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setHabilidad,
                                "habilidad",
                                index
                              )
                            }
                            type="text"
                            name="habilidad"
                            className="form-control mb-3"
                            id={`habilidad-${index}`}
                            placeholder={`Habilidad ${index + 1}`}
                          />
                        </div>
                        <div className="col-2">
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setHabilidad,
                                "porcentaje",
                                index
                              )
                            }
                            id={`barra${index}`}
                            type="number"
                            className="form-control mb-3"
                            placeholder="Estrellas"
                            min="1"
                            max="5"
                            onInput={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value < 1) e.target.value = 1;
                              if (value > 5) e.target.value = 5;
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="submitButton">
                  <button
                    onClick={() => removeLastElement(setHabilidad)}
                    className="btn btn-danger text-end m-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addElement(setHabilidad, "habilidad")}
                    className="btn btn-success text-end m-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="">
                  <label htmlFor="#" className="form-label">
                    Experiencias Laborales
                  </label>
                  {experiencia.map((item, index) => (
                    <div key={index} className="col-12 col-md-12 mb-3">
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="#" className="form-label"></label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setExperiencia,
                                "experiencia",
                                index
                              )
                            }
                            type="text"
                            className="form-control mb-3"
                            name="experiencia"
                            id={`experiencia-${index}`}
                            placeholder={`Experiencia ${index + 1}`}
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="startDate">Inicio</label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setExperiencia,
                                "fechaInicial",
                                index
                              )
                            }
                            id="startDate"
                            className="form-control"
                            type="date"
                            placeholder="Inicio"
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="finalDate">Final</label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setExperiencia,
                                "fechaFinal",
                                index
                              )
                            }
                            id="finalDate"
                            className="form-control"
                            type="date"
                            placeholder="Final"
                          />
                        </div>

                        <div className="col-12">
                          <textarea
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setExperiencia,
                                "descripcion",
                                index
                              )
                            }
                            className="form-control"
                            id={`textAreaExperiencia${index}`}
                            rows="3"
                            placeholder={`Descripción de experiencia ${
                              index + 1
                            }`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="submitButton">
                  <button
                    onClick={() => removeLastElement(setExperiencia)}
                    className="btn btn-danger text-end m-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addElement(setExperiencia, "experiencia")}
                    className="btn btn-success text-end m-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="">
                  <label htmlFor="#" className="form-label">
                    Formación
                  </label>
                  {formacion.map((item, index) => (
                    <div key={index} className="col-12 col-md-12 mb-3">
                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="#" className="form-label"></label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setFormacion,
                                "formacion",
                                index
                              )
                            }
                            type="text"
                            className="form-control mb-3"
                            name="formacion"
                            id={`formacion-${index}`}
                            placeholder={`Formacion ${index + 1}`}
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="startDate">Inicio</label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setFormacion,
                                "fechaInicial",
                                index
                              )
                            }
                            id="startDate"
                            className="form-control"
                            type="date"
                            placeholder="Inicio"
                          />
                        </div>
                        <div className="col-3">
                          <label htmlFor="finalDate">Final</label>
                          <input
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setFormacion,
                                "fechaFinal",
                                index
                              )
                            }
                            id="finalDate"
                            className="form-control"
                            type="date"
                            placeholder="Final"
                          />
                        </div>

                        <div className="col-12">
                          <textarea
                            onChange={(e) =>
                              handleTodoList(
                                e,
                                setFormacion,
                                "descripcion",
                                index
                              )
                            }
                            className="form-control"
                            id={`textAreaExperiencia${index}`}
                            rows="3"
                            placeholder={`Descripción de formación ${
                              index + 1
                            }`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="submitButton">
                  <button
                    onClick={() => removeLastElement(setFormacion)}
                    className="btn btn-danger text-end m-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addElement(setFormacion, "formacion")}
                    className="btn btn-success text-end m-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <span className="text-center">Ubicación</span>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4743.874428242662!2d-67.96971352418878!3d10.264400189854896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e805cbbd82e1ddf%3A0xb979854c355714fa!2sConjunto%20Residencial%20San%20Francisco!5e1!3m2!1ses-419!2sve!4v1738553809162!5m2!1ses-419!2sve"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen // Corregido: allowfullscreen a allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="submitButton">
              <button
                onClick={handleSubmit}
                className="btn btn-primary text-end my-2"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 form-group bg-white mt-3 p-3 rounded-3">
          <h4 className="text-center mt-2">Registrar de Acciones</h4>
          <table className="tableActions w-full">
            <thead>
              <tr>
                <th scope="col">Operador</th>
                <th scope="col">Dato</th>
                <th scope="col">K</th>
                <th scope="col">P</th>
                <th scope="col">H</th>
                <th scope="col">M</th>
                <th scope="col">B</th>
                <th scope="col">Scrolling</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ingresar Nombre</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Apellido</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Profesión</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Teléfono</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Correo</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Pagina Web</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Perfil</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Idiomas</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar competencia</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Habilidades</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Experiencias Laborales</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Ingresar Formacioón</td>
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
        {/*AQUI COLOCAS INFO ABAJO */}
      </div>
    </div>
  );
};
