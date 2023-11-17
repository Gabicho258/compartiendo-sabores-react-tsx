import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { users } from "../../static_test/users";
import "./_EditProfile.scss";

const user = users[0];

export const EditProfile = () => {
  return (
    <>
      <div className="editProfile">
        <div className="editProfile__buttons">
          <Button variant="contained" className="editProfile__buttons-cancel">
            Cancelar
          </Button>
          <Button variant="contained" className="editProfile__buttons-save">
            Guardar
          </Button>
        </div>
        <div className="editProfile__main">
          <div className="editProfile__main-userImage">
            <Avatar
              className="editProfile__main-userImage-image"
              alt="Juan Perez"
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            />
            <Button
              variant="text"
              className="editProfile__main-userImage-editImageBtn"
            >
              <AddIcon className="editProfile__main-userImage-editImageBtn-icon" />
              <div className="editProfile__main-userImage-editImageBtn-label">
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
                    defaultValue={user.email}
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
                    >
                      {user.description}
                    </textarea>
                  </div>
                </div>
              </div>
              <div className="editProfile__main-editForm-grid-right">
                <div className="editProfile__main-editForm-grid-right-field">
                  <p className="editProfile__main-editForm-grid-right-label">
                    Nueva contraseña
                  </p>
                  <div className="editProfile__main-editForm-grid-right-field-inputContainer">
                    <input
                      type="text"
                      className="editProfile__main-editForm-grid-right-field-inputContainer-input"
                    />
                  </div>
                </div>
                <div className="editProfile__main-editForm-grid-right-field">
                  <p className="editProfile__main-editForm-grid-right-label">
                    Confirmar contraseña
                  </p>
                  <div className="editProfile__main-editForm-grid-right-field-inputContainer">
                    <input
                      type="text"
                      className="editProfile__main-editForm-grid-right-field-inputContainer-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};