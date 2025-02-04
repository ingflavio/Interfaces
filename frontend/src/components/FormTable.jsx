import axios from "axios";
import { useState } from "react";
import { URL } from "../API/URL";
import useAuthStore from "../store/useAuthStore";
import { Map } from "./Map";

export const FormTable = () => {
  const { user } = useAuthStore();

  const [formBody, setFormBody] = useState({
    nombre: "",
    apellido: "",
    profesion: "",
    telefono: "",
    gmail: "",
    sitioWeb: "",
    perfil: "",
    direccion: "",
    foto: "",
    idiomas: [],
    competencias: [],
    habilidades: [],
    experenciasLaborales: [],
    formacion: [],
    permisos: [],
    contrasena: "",
  });

  const [idioma, setIdioma] = useState([{ id: 1, idioma: "" }]);
  const [competencia, setCompetencia] = useState([
    { id: 1, nombre: "", habilidad: "" },
  ]);
  const [habilidad, setHabilidad] = useState([
    { id: 1, habilidad: "", porcentaje: "" },
  ]);
  const [experiencia, setExperiencia] = useState([
    {
      id: 1,
      empresa: "",
      descripcion: "",
      fechaIni: "",
      fechaFin: "",
    },
  ]);
  const [formacion, setFormacion] = useState([
    {
      id: 1,
      instituto: "",
      titulo: "",
      fechaIni: "",
      fechaFin: "",
    },
  ]);

  const [photo, setPhoto] = useState("");

  const handleFormChange = (e) => {
    const { id, value } = e.target;
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
    setState((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const handleSubmit = async () => {
    const updatedFormBody = {
      ...formBody,
      idiomas: idioma.map((item) => item.idioma),
      competencias: competencia.map((item) => ({
        nombre: item.nombre,
        habilidad: parseInt(item.habilidad, 10),
      })),
      habilidades: habilidad.map((item) => ({
        habilidad: parseInt(item.habilidad, 10),
        nombreHabilidad: item.nombreHabilidad,
      })),
      experenciasLaborales: experiencia.map((item) => ({
        empresa: item.empresa,
        descripcion: item.descripcion,
        fechaIni: item.fechaIni,
        fechaFin: item.fechaFin,
      })),
      formacion: formacion.map((item) => ({
        instituto: item.instituto,
        titulo: item.titulo,
        fechaIni: item.fechaIni,
        fechaFin: item.fechaFin,
      })),
      permisos: ["READ"],
    };

    console.log("JSON a enviar:", JSON.stringify(updatedFormBody, null, 2));

    try {
      const res = await axios.put(URL + "datos-extras", updatedFormBody, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
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
                    id="sitioWeb"
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
                              handleTodoList(e, setCompetencia, "nombre", index)
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
                                "habilidad",
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
                                "nombreHabilidad",
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
                                "habilidad",
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
                                "empresa",
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
                                "fechaIni",
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
                                "fechaFin",
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
                                "instituto",
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
                              handleTodoList(e, setFormacion, "fechaIni", index)
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
                              handleTodoList(e, setFormacion, "fechaFin", index)
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
                              handleTodoList(e, setFormacion, "titulo", index)
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
              <Map />
              <div className="form-group my-3">
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                </div>
              </div>
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
      </div>
    </div>
  );
};
