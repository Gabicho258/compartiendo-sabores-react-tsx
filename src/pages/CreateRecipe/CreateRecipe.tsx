import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./_CreateRecipe.scss";

interface recipe {
    title: String,
    ingredients: String[],
    procedure: String[],
    images: String[],
};

export const CreateRecipe = () => {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');
    

    const addIngredient = (ingredient: string) => { 
        setIngredients([
            ...ingredients, ingredient
        ])
        setNewIngredient('')
    }
    const removeIngredient = (ingredient:string) => {
        const newArray = ingredients.filter(item => item !== ingredient);
        setIngredients(newArray);
      };
    console.log(ingredients)

    const [procedures, setProcedures] = useState<string[]>([]);
    const [newProcedure, setNewProcedure] = useState<string>('');
    

    const addProcedure = (procedure: string) => { 
        setProcedures([
            ...procedures, procedure
        ])
        setNewProcedure('')
    }
    const removeProcedure = (procedure :string) => {
        const newArray = procedures.filter(item => item !== procedure);
        setProcedures(newArray);
      };
    console.log(ingredients)
    
    return (
        <>
            <div className="createRecipeContainer">
                <form className="createRecipeForm">
                    <div className="createRecipeForm__name">
                        <div className="createRecipeForm__name-label">
                            <label >
                                Ponle título a tu receta:
                            </label>
                        </div>
                        <TextField
                            required
                            id="name"
                            className="createRecipeForm__name-input"
                        //value={form.name}
                        //onChange={({ target }) => {
                        //inputChange(target.value, "name");
                        //}}
                        />
                    </div>
                    <div>
                        <h2>Ingredientes:</h2>
                        <ul>
                            {ingredients.map((ingredient,index) => (
                                <li key={index}>
                                    {ingredient}
                                    <button  onClick={()=>removeIngredient(ingredient)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <TextField 
                        value={newIngredient}
                        onChange={({ target }) => {
                            setNewIngredient(target.value);
                        }}
                    />
                    <div className="createRecipeForm__btn-create">
                        <Button
                            variant="contained"
                            className="createRecipeForm__btn-create-b"
                            onClick={()=>{
                                addIngredient(newIngredient)
                            }}
                        >
                            + Agregar Ingredientes
                        </Button>
                    </div>
                    <div>
                        <h2>Procedimientos:</h2>
                        <ul>
                            {procedures.map((procedure,index) => (
                                <li key={index}>
                                    {procedure}
                                    <button  onClick={()=>removeProcedure(procedure)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <TextField 
                        value={newProcedure}
                        onChange={({ target }) => {
                            setNewProcedure(target.value);
                        }}
                    />
                    <div className="createRecipeForm__btn-create">
                        <Button
                            variant="contained"
                            className="createRecipeForm__btn-create-b"
                            onClick={()=>{
                                addProcedure(newProcedure)
                            }}
                        >
                            + Agregar Procedimiento
                        </Button>
                    </div>
                    <div className="createRecipeForm__btn-create">
                        <label >
                            Fotos de tu receta:
                        </label>
                        <Button
                            variant="contained"
                            className="createRecipeForm__btn-create-b"
                        >
                            Agregar Foto
                        </Button>
                    </div>
                    <div className="createRecipeForm__btn-create">
                        <Button
                            variant="contained"
                            className="createRecipeForm__btn-create-b"
                        >
                            Agregar Foto
                        </Button>
                    </div>
                    <div className="createRecipeForm__btn-create">
                        <Button
                            variant="contained"
                            className="createRecipeForm__btn-create-b"
                        >
                            Publicar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}