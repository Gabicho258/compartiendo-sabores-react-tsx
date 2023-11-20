import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./_Register.scss";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../app/apis/user.api";

interface dataUser {
  name: String;
  lastName: String;
  email: String;
  password: String;
  verifyPassword: String;
  rol: String;
}

export const Register = () => {
  const [form, setForm] = useState<dataUser>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
    rol: "",
  });

  const inputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };
  const navigate = useNavigate();
  // const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
  // const handleRegister = async () => {
  //   const algo = await createUser({
  //     first_name: "Prueba",
  //     last_name: "RTK-Query",
  //     email: "RTK-Query@correo.com",
  //     password: "123",
  //   });
  //   console.log(algo);
  // };
  // console.log("isLoading", isLoading);
  // console.log("isSuccess", isSuccess);

  // console.log(form);

  return (
    <>
      <div className="registerContainer">
        <div className="registerTitle">
          <h1 className="registerTitle__t">
            Registrarse
            <br />
          </h1>
        </div>
        <form className="registerForm">
          <div className="registerForm__name">
            <div className="registerForm__name-label">
              <label>Nombres:</label>
            </div>
            <TextField
              required
              id="name"
              className="registerForm__name-input"
              value={form.name}
              onChange={({ target }) => {
                inputChange(target.value, "name");
              }}
            />
          </div>
          <div className="registerForm__lastName">
            <div className="registerForm__lastName-label">
              <label>Apellidos:</label>
            </div>
            <TextField
              required
              id="lastName"
              className="registerForm__lastName-input"
              value={form.lastName}
              onChange={({ target }) => {
                inputChange(target.value, "lastName");
              }}
            />
          </div>
          <div className="registerForm__email">
            <div className="registerForm__email-label">
              <label>Correo Electrónico:</label>
            </div>
            <TextField
              required
              id="email"
              type="email"
              className="registerForm__email-input"
              value={form.email}
              onChange={({ target }) => {
                inputChange(target.value, "email");
              }}
            />
          </div>
          <div className="registerForm__password">
            <div className="registerForm__password-label">
              <label>Contraseña:</label>
            </div>
            <TextField
              required
              value={form.password}
              id="password"
              type="password"
              className="registerForm__password-input"
              onChange={({ target }) => {
                inputChange(target.value, "password");
              }}
            />
          </div>
          <div className="registerForm__verifyPassword">
            <div className="registerForm__verifyPassword-label">
              <label>Confirmar contraseña:</label>
            </div>
            <TextField
              required
              value={form.verifyPassword}
              id="verifyPassword"
              type="password"
              className="registerForm__verifyPassword-input"
              onChange={({ target }) => {
                inputChange(target.value, "verifyPassword");
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
                  onClick={({}) => {
                    inputChange("Personal", "rol");
                  }}
                />

                <FormControlLabel
                  value="Empresa"
                  control={<Radio />}
                  label="Empresa"
                  onClick={({}) => {
                    inputChange("Empresa", "rol");
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="registerForm__btn-create">
            <Button
              variant="contained"
              className="registerForm__btn-create-b"
              // onClick={handleRegister}
            >
              Crear Cuenta
            </Button>
          </div>
          <div className="registerForm__btn-create">
            <Button
              variant="contained"
              className="registerForm__btn-create-b"
              onClick={() => {
                navigate("/login");
              }}
            >
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
