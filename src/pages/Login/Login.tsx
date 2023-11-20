import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_Login.scss";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useLoginMutation,
} from "../../app/apis/compartiendoSabores.api";
import { User, UserCredentials } from "../../interfaces";

export const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const onInputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: any = await login(form).unwrap();
      console.log(response);
      localStorage.setItem(
        "data",
        JSON.stringify({ token: response.token, id: response.user._id })
      );
      navigate("/homepage");
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
  };

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
        <form
          className="loginForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
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
                onInputChange(target.value, "email");
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
                onInputChange(target.value, "password");
              }}
            />
          </div>
          <div className="loginForm__btn-login">
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              className="loginForm__btn-login-b"
              // onClick={() => {
              //   print();
              //   navigate("/homepage");
              // }}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </div>
          <div className="loginForm__btn-register">
            <Button
              disabled={isLoading}
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
