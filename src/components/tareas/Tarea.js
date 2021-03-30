import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  //obtener el state de proyecto
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //obtener las tareas del proyectos
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

  //extraer el proyecto
  const [proyectoActual] = proyecto;

  //Funcion para eliminar tarea cuando se pesiona el btn
  const tareaEliminar = id => {
    eliminarTarea(id, proyectoActual._id);
    obtenerTareas(proyectoActual.id);
  };

  //funcion que modifica el estado de las tareas
  const cambiarEstado = tarea =>{
    if (tarea.estado){
      tarea.estado = false;
    }else{
      tarea.estado = true;
    }
    actualizarTarea(tarea)
  }

  //Agrega una tara actual cuando el usuario quiere editar
  const seleccionarTarea = tarea =>{
    guardarTareaActual(tarea)
  }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={ () => seleccionarTarea(tarea)} >
          Editar
        </button>
        <button
          type="button"
          className="btn-secundario btn"
          onClick={() => tareaEliminar(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
