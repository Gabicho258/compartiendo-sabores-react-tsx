import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Login.scss";

interface credentials  {
    email: string;
    password: string,
};

export const Login = () => {

    const [form, setForm] = useState<credentials>({
      email: '',
      password: '',
    });

  const inputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  console.log(form);

  return (
    <>
      <h1>¡Bienvenid@ a Compartiendo Sabores!</h1>
      <form className="loginForm">
        <div className="loginForm__mail">
          <label>
            Correo Electronico:
          </label>
          <TextField
            required
            id="email"
            type="email"
            className="loginForm__mail-input"
            value={form.email}
            onChange={({ target }) => {
              inputChange(target.value, "email");
            }}
          />
        </div>
        <div className="loginForm__password">
          <label>
            Contraseña:
          </label>
          <TextField
            required
            value={form.password}
            id="password"
            type="password"
            className="loginForm__password-input"
            onChange={({ target }) => {
              inputChange(target.value, "password");
            }}
          />
        </div>
        <Button
          variant="contained"
          className="loginForm__btn-login"
          >
            Iniciar Sesión
        </Button>
        <Button
          variant="contained"
          className="loginForm__btn-register">
            Registrase 
        </Button> 
      </form>

      {/* BEM */}
    </>
  );
};
