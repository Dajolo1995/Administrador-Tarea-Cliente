import React, { useContext, useEffect } from "react";
import Sibedar from "../layout/Sibedar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTarea from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticación/authContext";


const Proyectos = () => {
  //Extraer la información de autenticación
  const authContext = useContext(AuthContext);
  const {usuarioAutenticado} = authContext;

  useEffect(() => {
    usuarioAutenticado();
     //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sibedar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTarea />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
