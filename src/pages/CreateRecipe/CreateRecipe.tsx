import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ControlLabel from "@mui/material/FormControlLabel";
import Control from "@mui/material/FormControl";
import "./_CreateRecipe.scss";
import { fontSize } from "@mui/system";

export const CreateRecipe = () => {

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');


    const addIngredient = (ingredient: string) => {
        setIngredients([
            ...ingredients, ingredient
        ])
        setNewIngredient('')
    }
    const removeIngredient = (ingredient: string) => {
        const newArray = ingredients.filter(item => item !== ingredient);
        setIngredients(newArray);
    };

    const [procedures, setProcedures] = useState<string[]>([]);
    const [newProcedure, setNewProcedure] = useState<string>('');


    const addProcedure = (procedure: string) => {
        setProcedures([
            ...procedures, procedure
        ])
        setNewProcedure('')
    }
    const removeProcedure = (procedure: string) => {
        const newArray = procedures.filter(item => item !== procedure);
        setProcedures(newArray);
    };

    const [title, setTitle] = useState('');

    const addTitle = (title: string) => {
        setTitle(title)
    }

    return (
        <>
            <div className="createRecipe">
                <div className="createRecipe__title">
                    <div className="createRecipe__title-h">
                        <h2>
                            Ponle título a tu receta...
                        </h2>
                    </div>
                    <div className="createRecipe__title-t">
                        <TextField
                            required
                            id="name"
                            className="createRecipe__title-t-input"
                            value={title}
                            onChange={({ target }) => {
                                addTitle(target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="createRecipe__half">
                    <div className="createRecipe__half-ingredients">
                        <h2>Ingredientes:</h2>
                        <div className="createRecipe__half-ingredients-list">
                            <ul>
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="createRecipe__half-ingredients-list-l">
                                        {ingredient}<label>  </label>  
                                        <button 
                                            className="createRecipe__half-ingredients-list-l-b" 
                                            onClick={() => removeIngredient(ingredient)}>
                                                Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="createRecipe__half-ingredients-inputBtn">
                            <TextField
                                value={newIngredient}
                                className="createRecipe__half-ingredients-inputBtn-input"
                                onChange={({ target }) => {
                                    setNewIngredient(target.value);
                                }}
                            />
                            <div className="createRecipe__half-ingredients-inputBtn-btn">
                                <Button
                                    variant="contained"
                                    className="createRecipe__half-ingredients-inputBtn-btn-b"
                                    onClick={() => {
                                        addIngredient(newIngredient)
                                    }}
                                >
                                Agregar 
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="createRecipe__half-procedure">
                        <h2>Procedimientos:</h2>
                        <div className="createRecipe__half-procedure-list">
                            <ul>
                                {procedures.map((procedure, index) => (
                                    <li key={index} className="createRecipe__half-procedure-list-l">
                                        {procedure}<label> </label>
                                        <button
                                            className="createRecipe__half-procedure-list-l-b"
                                            onClick={() => removeProcedure(procedure)}
                                            >Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="createRecipe__half-procedure-inputBtn">
                            <TextField
                                value={newProcedure}
                                className="createRecipe__half-procedure-inputBtn-input"
                                onChange={({ target }) => {
                                    setNewProcedure(target.value);
                                }}
                            />
                            <div className="createRecipe__half-procedure-inputBtn-btn">
                                <Button
                                    variant="contained"
                                    className="createRecipe__half-procedure-inputBtn-btn-b"
                                    onClick={() => {
                                        addProcedure(newProcedure)
                                    }}
                                >
                                Agregar 
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="createRecipe__end">
                    <h2 >
                        Fotos de tu receta:
                    </h2>
                    <div className="createRecipe__end-btn">
                        <div className="createRecipe__end-btn-foto">
                            <Button
                                variant="contained"
                                className="createRecipe__end-btn-foto-b1"
                            >
                                Agregar Foto
                            </Button>
                            <Button
                                variant="contained"
                                className="createRecipe__end-btn-foto-b2"
                            >
                                Agregar Foto
                            </Button>
                        </div>
                        <div className="createRecipe__end-btn-post">
                            <Button
                                variant="contained"
                                className="createRecipe__end-btn-post-b"
                            >
                                Publicar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}