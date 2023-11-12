import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Register.scss";

interface credentials  {
    email: string;
    password: string,
};
export const Register = () =>{
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
        <div className="container">
          <div className="loginTitle">
            <h1 className="loginTitle__t">
            ¡Bienvenid@ a Compartiendo
            <br />
            Sabores!
            </h1>
          </div>
          <form className="loginForm">
            <div className="loginForm__email">
              <div className="loginForm__email-label">
                <label >
                Correo Electronico:
                </label>
              </div>
              <TextField
                required
                id="email"
                type="email"
                className="loginForm__email-input"
                value={form.email}
                onChange={({ target }) => {
                  inputChange(target.value, "email");
                }}
              />
            </div>
            <div className="loginForm__password">
              <div className="loginForm__email-label">
                <label>
                  Contraseña:
                </label>
              </div>
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
            <div className="loginForm__btn-login">
              <Button
                variant="contained"
                className="loginForm__btn-login-b"
              >
                Iniciar Sesión
              </Button>
            </div>
            <div className="loginForm__btn-register">
              <Button
                variant="contained"
                className="loginForm__btn-register-b"
              >
                Registrase
              </Button>
            </div>
          </form>
        </div>
        </>
      );
}