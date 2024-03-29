import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_CreateRecipe.scss";
import { Recipe } from "../../interfaces";
import { useCreateRecipeMutation } from "../../app/apis/compartiendoSabores.api";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { categories } from "../../utils/categories";

import TextArea from '@mui/material/TextField';

import { cloudinaryService } from "../../services/cloudinaryService";


export const CreateRecipe = () => {
  const isUserAuthenticated = localStorage.getItem("data");
  const userCredentials =
    isUserAuthenticated && JSON.parse(isUserAuthenticated);
  const [ingre, setIngre] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [proce, setProce] = useState<string[]>([]);
  const [newProcedure, setNewProcedure] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<any[]>([]);
  const [form, setForm] = useState<Partial<Recipe>>({
    title: "",
    ingredients: [],
    procedure: [],
    category,
    images: [],
  });
  //   const { data } = useGetUserByIdQuery(userCredentials?.id);
  const [createRecipe, { isLoading }] = useCreateRecipeMutation();
  const navigate = useNavigate();
  const addIngredient = (i: string) => {
    setIngre([...ingre, i]);
    setForm({
      ...form,
      ingredients: [...ingre, i],
    });
    setNewIngredient("");
  };
  const removeIngredient = (ingredient: string) => {
    const newArray = ingre.filter((item) => item !== ingredient);
    setIngre(newArray);
    setForm({
      ...form,
      ingredients: newArray,
    });
  };

  const addProcedure = (p: string) => {
    setProce([...proce, p]);
    setForm({
      ...form,
      procedure: [...proce, p],
    });
    setNewProcedure("");
  };
  const removeProcedure = (procedure: string) => {
    const newArray = proce.filter((item) => item !== procedure);
    setProce(newArray);
    setForm({
      ...form,
      procedure: newArray,
    });
  };
  const addImages = (photo_url: string, photo_name: string) => {
    // setImage([...image, photo_url]);
    setImage([...image, { photo_url, photo_name }]);
    setForm({
      ...form,
      images: [...image.map((photoObj) => photoObj.photo_url), photo_url],
    });
  };

  const removeImages = (photo_name: string) => {
    const newArray = image.filter(
      (photoObj) => photoObj.photo_name !== photo_name
    );
    setImage(newArray);
    setForm({
      ...form,
      images: newArray.map((photoObj) => photoObj.photo_url),
    });
  };
  const addTitle = (t: string) => {
    setForm({
      ...form,
      title: t,
    });
  };
  const handleCreateRecipe = async () => {
    try {
      // console.log(form);
      await createRecipe({ ...form, user_id: userCredentials.id }).unwrap();
      navigate(-1);
    } catch (error: any) {
      alert(JSON.stringify(error.data));
    }
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setForm({
      ...form,
      category: event.target.value,
    });
  };
  // Conexion with cloudinary service
  const showWidgetPhotoRecipe = async () => {
    let state = "";
    let URL = "";
    let photoName = "";
    // hacemos un casteo para evitar errores
    (window as any).cloudinary.openUploadWidget(
      cloudinaryService("recipe_photos"),
      (err: any, result: any) => {
        if (!err && result && result.event === "success") {
          state = "success";
          const { secure_url, original_filename, format } = result.info;
          URL = secure_url;
          photoName = `${original_filename}.${format}`;
          // setPhotoUserUrl(secure_url);
          // setPhotoName(`${original_filename}.${format}`);
        }
        if (state === "success" && result.event === "close") {
          // handlePhotoEdit(URL);
          console.log(URL);
          addImages(URL, photoName);
          // onInputChange(URL, "photo_url");
        }
      }
    );
  };
  // console.log(form);
  return (
    <>
      <div className="createRecipe">
        <div className="createRecipe__title">
          <div className="createRecipe__title-h">
            <h2>Ponle título a tu receta...</h2>
          </div>
          <div className="createRecipe__title-t">
            <TextField
              required
              id="name"
              className="createRecipe__title-t-input"
              value={form.title}
              onChange={({ target }) => {
                addTitle(target.value);
              }}
            />
          </div>
        </div>
        <div className="createRecipe__titles">
          <div className="createRecipe__titles-i">
            <h2>Ingredientes:</h2>
          </div>
          <div className="createRecipe__titles-p">
            <h2>Procedimientos:</h2>
          </div>
        </div>
        <div className="createRecipe__half">
          <div className="createRecipe__half-ingredients">
            {ingre.length > 0 && (
              <div className="createRecipe__half-ingredients-list">
                <ul>
                  {ingre.map((i, index) => (
                    <li key={index}>
                      <div className="createRecipe__half-ingredients-list-l">
                        <div className="createRecipe__half-ingredients-list-l-i">
                          {i}
                        </div>
                        <button
                          className="createRecipe__half-ingredients-list-l-b"
                          onClick={() => removeIngredient(i)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="createRecipe__half-procedure">
            {proce.length > 0 && (
              <div className="createRecipe__half-procedure-list">
                <ol>
                  {proce.map((p, index) => (
                    <li key={index}>
                      <div className="createRecipe__half-procedure-list-l">
                        <div className="createRecipe__half-procedure-list-l-i">
                          <textarea readOnly>{p}</textarea>
                        </div>
                        <button
                          className="createRecipe__half-procedure-list-l-b"
                          onClick={() => removeProcedure(p)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
        <div className="createRecipe__inputBtn">
          <div className="createRecipe__inputBtn-ingredients">
            <TextField
              value={newIngredient}
              className="createRecipe__inputBtn-ingredients-input"
              onChange={({ target }) => {
                setNewIngredient(target.value);
              }}
            />
            <div className="createRecipe__inputBtn-ingredients-btn">
              <Button
                variant="contained"
                className="createRecipe__inputBtn-ingredients-btn-b"
                onClick={() => {
                  addIngredient(newIngredient);
                }}
              >
                Agregar
              </Button>
            </div>
          </div>
          <div className="createRecipe__inputBtn-procedure">
            <textarea
              value={newProcedure}
              className="createRecipe__inputBtn-procedure-input"
              onChange={({ target }) => {
                setNewProcedure(target.value);
              }}
            />
            <div className="createRecipe__inputBtn-procedure-btn">
              <Button
                variant="contained"
                className="createRecipe__inputBtn-procedure-btn-b"
                onClick={() => {
                  addProcedure(newProcedure);
                }}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
        <div className="createRecipe__category">
          <h2 id="select-label">Categoría</h2>
          <Select
            className="createRecipe__category-select"
            labelId="select-label"
            id="demo-simple-select"
            value={category}
            style={{ width: "10rem", color: "#fff" }}
            label="Categoría"
            onChange={handleCategoryChange}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="createRecipe__end">
          <h2>Fotos de tu receta:</h2>
          <div className="createRecipe__end-btn">
            <div className="createRecipe__end-btn-foto">
            {image.length > 0 && (
              <div className="createRecipe__end-btn-foto-b1">
                <ul>
                  {image.map((image, index) => (
                    <li key={index}>
                      <div className="createRecipe__half-ingredients-list-l">
                        <div className="createRecipe__half-ingredients-list-l-i">
                          {image.photo_name}
                        </div>
                        <button
                          className="createRecipe__half-ingredients-list-l-b"
                          onClick={() => removeImages(image.photo_name)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>)}
              <Button
                variant="contained"
                className="createRecipe__end-btn-foto-b2"
                onClick={showWidgetPhotoRecipe}
              >
                Agregar Foto
              </Button>
            </div>
            <div className="createRecipe__end-btn-post">
              <Button
                className="createRecipe__end-btn-post-c"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                className="createRecipe__end-btn-post-b"
                onClick={handleCreateRecipe}
                disabled={
                  form.ingredients?.length === 0 ||
                  form.procedure?.length === 0 ||
                  isLoading
                }
              >
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
