import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
// import { users } from "../../static_test/users";
import { User } from "../../interfaces";
import "./_EditProfile.scss";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../app/apis/compartiendoSabores.api";
import { useNavigate } from "react-router-dom";
import { cloudinaryService } from "../../services/cloudinaryService";

// const user = users[0];

export const EditProfile = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const { data, isSuccess } = useGetUserByIdQuery(userCredentials.id);
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [form, setForm] = useState<Partial<User>>({
    first_name: data?.first_name,
    last_name: data?.last_name,
    phone_number: data?.phone_number,
    description: data?.description,
    photo_url: data?.photo_url,
    // password: "",
  });

  const onInputChange = (value: string, field: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleUserUpdate = async () => {
    try {
      await updateUser({ ...form, _id: userCredentials.id }).unwrap();
      navigate("/homepage");
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
  };
  // Conexion with cloudinary service
  const showWidgetPhotoUser = async () => {
    let state = "";
    let URL = "";
    // hacemos un casteo para evitar errores
    (window as any).cloudinary.openUploadWidget(
      cloudinaryService("user_photos"),
      (err: any, result: any) => {
        if (!err && result && result.event === "success") {
          state = "success";
          const { secure_url /*, original_filename, format */ } = result.info;
          URL = secure_url;
          // setPhotoUserUrl(secure_url);
          // setPhotoName(`${original_filename}.${format}`);
        }
        if (state === "success" && result.event === "close") {
          // handlePhotoEdit(URL);
          console.log(URL);
          onInputChange(URL, "photo_url");
        }
      }
    );
  };
  useEffect(() => {
    setForm({
      first_name: data?.first_name,
      last_name: data?.last_name,
      phone_number: data?.phone_number,
      description: data?.description,
      photo_url: data?.photo_url,
    });
  }, [isSuccess]);
  return (
    <>
      <div className="editProfile">
        <div className="editProfile__buttons">
          <Button
            variant="contained"
            className="editProfile__buttons-cancel"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="editProfile__buttons-save"
            onClick={handleUserUpdate}
          >
            Guardar
          </Button>
        </div>
        <div className="editProfile__main">
          <div className="editProfile__main-userImage">
            <Avatar
              className="editProfile__main-userImage-image"
              alt={data?.first_name}
              src={form?.photo_url}
            />
            <Button
              variant="text"
              className="editProfile__main-userImage-editImageBtn"
            >
              <AddIcon className="editProfile__main-userImage-editImageBtn-icon" />
              <div
                className="editProfile__main-userImage-editImageBtn-label"
                onClick={showWidgetPhotoUser}
              >
                Editar foto
              </div>
            </Button>
          </div>
          <Divider className="editProfile__main-divider" />
          <div className="editProfile__main-editForm">
            <div className="editProfile__main-editForm-grid">
              <div className="editProfile__main-editForm-grid-left">
                <div className="editProfile__main-editForm-grid-left-field">
                  <p className="editProfile__main-editForm-grid-left-field-label">
                    Correo
                  </p>
                  <TextField
                    className="editProfile__main-editForm-grid-left-field-input-disabled"
                    disabled
                    id="outlined-disabled"
                    value={data?.email}
                    sx={{
                      "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": {
                          opacity: 0,
                        },
                      },
                    }}
                  />
                </div>
                <div className="editProfile__main-editForm-grid-left-field">
                  <p className="editProfile__main-editForm-grid-left-field-label">
                    Nombre
                  </p>
                  <div className="editProfile__main-editForm-grid-left-field-inputContainer">
                    <input
                      type="text"
                      className="editProfile__main-editForm-grid-left-field-inputContainer-input"
                      onChange={({ target }) => {
                        onInputChange(target.value, "first_name");
                      }}
                      value={form?.first_name}
                    />
                  </div>
                </div>
                <div className="editProfile__main-editForm-grid-left-field">
                  <p className="editProfile__main-editForm-grid-left-field-label">
                    Apellido
                  </p>
                  <div className="editProfile__main-editForm-grid-left-field-inputContainer">
                    <input
                      type="text"
                      className="editProfile__main-editForm-grid-left-field-inputContainer-input"
                      value={form.last_name}
                      onChange={({ target }) => {
                        onInputChange(target.value, "last_name");
                      }}
                    />
                  </div>
                </div>
                <div className="editProfile__main-editForm-grid-left-field">
                  <p className="editProfile__main-editForm-grid-left-label">
                    Contacto
                  </p>
                  <div className="editProfile__main-editForm-grid-left-field-inputContainer">
                    <input
                      type="text"
                      className="editProfile__main-editForm-grid-left-field-inputContainer-input"
                      placeholder="Opcional..."
                      onChange={({ target }) => {
                        onInputChange(target.value, "phone_number");
                      }}
                      value={form.phone_number}
                    />
                  </div>
                </div>
                <div className="editProfile__main-editForm-grid-left-field">
                  <p className="editProfile__main-editForm-grid-left-label">
                    Descripción
                  </p>
                  <div className="editProfile__main-editForm-grid-left-field-inputContainer">
                    <textarea
                      className="editProfile__main-editForm-grid-left-field-inputContainer-textarea"
                      rows={4}
                      value={form.description}
                      onChange={({ target }) => {
                        onInputChange(target.value, "description");
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="editProfile__main-editForm-grid-right">
                {/* <div className="editProfile__main-editForm-grid-right-field">
                  <p className="editProfile__main-editForm-grid-right-label">
                    Nueva contraseña
                  </p>
                  <div className="editProfile__main-editForm-grid-right-field-inputContainer">
                    <input
                      type="password"
                      className="editProfile__main-editForm-grid-right-field-inputContainer-input"
                      onChange={({ target }) => {
                        onInputChange(target.value, "password");
                      }}
                    />
                  </div>
                </div>
                <div className="editProfile__main-editForm-grid-right-field">
                  <p className="editProfile__main-editForm-grid-right-label">
                    Confirmar contraseña
                  </p>
                  <div className="editProfile__main-editForm-grid-right-field-inputContainer">
                    <input
                      type="password"
                      className="editProfile__main-editForm-grid-right-field-inputContainer-input"
                      onChange={({ target }) => {
                        setVerifyPassword(target.value);
                      }}
                    />
                  </div>
                </div>
                {error ? (
                  <div className="editProfile__main-editForm-grid-right-passwordErr">
                    {error}
                  </div>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
