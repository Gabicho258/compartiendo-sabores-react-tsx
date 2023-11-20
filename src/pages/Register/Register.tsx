import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import "./_Register.scss";

import { verify } from "crypto";

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
  __v: number;
}

export const Register = () =>{
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [rol, setRol] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<User>>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',

// import { useNavigate } from "react-router-dom";
// import { useCreateUserMutation } from "../../app/apis/user.api";

// interface dataUser {
//   name: String;
//   lastName: String;
//   email: String;
//   password: String;
//   verifyPassword: String;
//   rol: String;
// }

// export const Register = () => {
//   const [form, setForm] = useState<dataUser>({
//     name: "",
//     lastName: "",
//     email: "",
//     password: "",
//     verifyPassword: "",
//     rol: "",
//   });

//   const inputChange = (value: string, field: string) => {
//     setForm({
//       ...form,
//       [field]: value,

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


    const inputChange = (value: string, field: string) => {
        setForm({
          ...form,
          [field]: value,
        });
    }

    const print = ()=>{
      if (form.password !== verifyPassword) {
        setError('Las contraseñas no coinciden');
      } else {
        setError(null);
          console.log(form);
          console.log(rol);
      }
      
    }

/*
<img
              className="registerTitle__i"
              alt="image_profile"
              src="https://cdn-icons-png.flaticon.com/512/21/21159.png"
              onClick={() => {
                navigate("/");
              }}></img>
*/

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
                <label >
                Nombres:
                </label>
              </div>
              <TextField
                required
                id="name"
                className="registerForm__name-input"
                value={form.first_name}
                onChange={({ target }) => {
                  inputChange(target.value, "first_name");
                }}
              />
            </div>
            <div className="registerForm__lastName">
              <div className="registerForm__lastName-label">
                <label >
                Apellidos:
                </label>
              </div>
              <TextField
                required
                id="lastName"
                className="registerForm__lastName-input"
                value={form.last_name}
                onChange={({ target }) => {
                  inputChange(target.value, "last_name");
                }}
              />

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

            <div className="registerForm__verifyPassword">
              <div className="registerForm__verifyPassword-label">
                <label>
                  Confirmar contraseña:
                </label>
              </div>
              {error && <span style={{ color: 'red' }}>{error}<br/></span>}
              <TextField
                required
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
                    onClick={({}) => {
                        setRol("Personal");
                    }}
                    />

                    <FormControlLabel
                    value="Empresa"
                    control={<Radio />}
                    label="Empresa"
                    onClick={({}) => {
                        setRol("Empresa");
                    }}
                    />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="registerForm__btn-create">
              <Button
                variant="contained"
                className="registerForm__btn-create-b"
                onClick={({}) =>{
                  print()
                }}
              >
                Crear Cuenta
              </Button>
              <p>
                ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
}

