import React, { useContext, useState, useEffect} from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Exraersi un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //obtener las tareas del proyectos
  const tareasContext = useContext(tareaContext);
  const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea } = tareasContext;

  //effect que detesta si hay una tarea seleccionada 
  useEffect(() => {
    if(tareaseleccionada !== null){
      guardarTarea(tareaseleccionada)
    }else{
      guardarTarea({
        nombre:''
      })
    }
  }, [tareaseleccionada]);

  //state formulario

  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  //extraer el nombre del proyecto
  const { nombre } = tarea;

  //Si no hay proyecto seleccionado
  if (!proyecto) return null;

  //Array destructuring para extreaer el proyecto axtual
  const [proyectoActual] = proyecto;

  //leer los valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if(nombre.trim() === ''){
      validarTarea();
      return
    }

    //Si es edición o si es nueva tarea
    if(tareaseleccionada === null){
      //tarea nueva
      //Agregar la nueva tarea al state de tarea
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }else{
      //actualizar tarea existente
      actualizarTarea(tarea)
    }

    //pasar la validación



    //obtener o filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id)
    //reiniciar el form
    guardarTarea({
      nombre:''
    })
  };


  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            className="input-text"
            type="text"
            placeholder="Nombre Tarea"
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>

      {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio </p> :null}
    </div>
  );
};



export default FormTarea;
