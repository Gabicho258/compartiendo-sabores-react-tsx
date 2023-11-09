// import { useEffect, useState } from 'react';
import { useEffect, useState } from "react";
import { Ejemplo } from "../../components/Ejemplo";
import "./_Login.scss";

export const Login = () => {
  const recetas = [1, 2, 3];

  const obj = {
    nombre: "juan",
    apellido: "perez",
  };
  const { apellido, nombre } = obj;
  console.log(nombre);
  console.log(apellido);
  const arr = ["1", "2", "3", "4", "5", "6"];

  const [segundo, primero] = arr;

  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });

  const cambiando = (valor: string, campo: string) => {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
  };
  console.log(formulario);

  return (
    <>
      <h1>Login</h1>
      <div className="">
        <p className="div__hola">
          Hola
          <span className="div__hola-span"> este es un span</span>
        </p>
        <p className="div__adios">Adios</p>
      </div>
      <input
        type="text"
        value={formulario.email}
        onChange={({ target }) => cambiando(target.value, "email")}
      />
      <input
        type="text"
        value={formulario.password}
        onChange={({ target }) => cambiando(target.value, "password")}
      />

      {/* BEM */}
    </>
  );
};
