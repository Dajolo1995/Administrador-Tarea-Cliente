import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  //obtener el state
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;

  const [proyecto, GuardarProyecto] = useState({
    nombre: "",
  });

  //Extraer nombre del proyectos
  const { nombre } = proyecto;

  //leer el input
  const onChangeProyecto = (e) => {
    GuardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando el ususario envia un proyectos
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validar
    if (nombre === "") {
      mostrarError();
      return;
    }
    //Agregar al State
    agregarProyecto(proyecto);
    //Reiniciar al form
    GuardarProyecto({
      nombre: "",
    });
  };

  //Mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>
      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="nombre del proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorformulario ? (
        <p className="mensaje error">El nombre del proyecto es obligatorrio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
