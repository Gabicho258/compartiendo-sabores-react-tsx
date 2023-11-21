import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import "./_Register.scss";
import { useCreateUserMutation } from "../../app/apis/compartiendoSabores.api";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  description: string;
  photo_url: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  __v: number;
}

export const Register = () => {
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [rol, setRol] = useState<string>("Personal");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<User>>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: rol,
  });
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const onInputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.password !== verifyPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError(null);
      try {
        await createUser(form).unwrap();
        navigate("/login");
      } catch (error: any) {
        alert(JSON.stringify(error.data));
      }
    }
  };

  return (
    <>
      <div className="registerContainer">
        <div className="registerTitle">
          <h1 className="registerTitle__t">
            Registrarse
            <br />
          </h1>
        </div>
        <form
          className="registerForm"
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <div className="registerForm__name">
            <div className="registerForm__name-label">
              <label>Nombres:</label>
            </div>
            <TextField
              required={true}
              id="name"
              className="registerForm__name-input"
              value={form.first_name}
              onChange={({ target }) => {
                onInputChange(target.value, "first_name");
              }}
            />
          </div>
          <div className="registerForm__lastName">
            <div className="registerForm__lastName-label">
              <label>Apellidos:</label>
            </div>
            <TextField
              required={true}
              id="lastName"
              className="registerForm__lastName-input"
              value={form.last_name}
              onChange={({ target }) => {
                onInputChange(target.value, "last_name");
              }}
            />
          </div>
          <div className="registerForm__email">
            <div className="registerForm__email-label">
              <label>Correo Electrónico:</label>
            </div>
            <TextField
              required={true}
              id="email"
              type="email"
              className="registerForm__email-input"
              value={form.email}
              onChange={({ target }) => {
                onInputChange(target.value, "email");
              }}
            />
          </div>
          <div className="registerForm__password">
            <div className="registerForm__password-label">
              <label>Contraseña:</label>
            </div>
            <TextField
              required={true}
              value={form.password}
              id="password"
              type="password"
              className="registerForm__password-input"
              onChange={({ target }) => {
                onInputChange(target.value, "password");
              }}
            />
          </div>
          <div className="registerForm__verifyPassword">
            <div className="registerForm__verifyPassword-label">
              <label>Confirmar contraseña:</label>
            </div>
            {error && (
              <span style={{ color: "red" }}>
                {error}
                <br />
              </span>
            )}
            <TextField
              required={true}
              id="verifyPassword"
              type="password"
              className="registerForm__verifyPassword-input"
              onChange={({ target }) => {
                setVerifyPassword(target.value);
              }}
            />
          </div>
          <div className="registerForm__userType">
            <label>Tipo de uso:</label>
            <br />
            <FormControl className="registerForm__userType-formControl">
              <RadioGroup
                row
                name="userType"
                defaultValue={"Personal"}
                className="registerForm__userType-formControl-radioGroup"
              >
                <FormControlLabel
                  value="Personal"
                  control={<Radio />}
                  label="Personal"
                  className="registerForm__userType-formControl-radioGroup-p"
                  onClick={() => {
                    setRol("Personal");
                    setForm({
                      ...form,
                      role: "Personal",
                    });
                  }}
                />

                <FormControlLabel
                  value="Empresa"
                  control={<Radio />}
                  label="Empresa"
                  onClick={() => {
                    setRol("Empresa");
                    setForm({
                      ...form,
                      role: "Empresa",
                    });
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="registerForm__btn-create">
            <Button
              type="submit"
              variant="contained"
              className="registerForm__btn-create-b"
              disabled={isLoading}
              //   onClick={handleRegister}
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
