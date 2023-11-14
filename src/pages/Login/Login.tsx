import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Login.scss";
import { useNavigate } from "react-router-dom";

interface credentials {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<credentials>({
    email: "",
    password: "",
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
      <div className="loginContainer">
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
              <label>Correo Electrónico:</label>
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
            <div className="loginForm__password-label">
              <label>Contraseña:</label>
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
              onClick={() => {
                navigate("/homepage");
              }}
            >
              Iniciar Sesión
            </Button>
          </div>
          <div className="loginForm__btn-register">
            <Button
              variant="contained"
              className="loginForm__btn-register-b"
              onClick={() => {
                navigate("/register");
              }}
            >
              Registrase
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
