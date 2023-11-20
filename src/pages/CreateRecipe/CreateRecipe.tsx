import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./_CreateRecipe.scss";
import { fontSize } from "@mui/system";

interface Recipe{
        _id: string,
        user_id: string,
        title: string,
        ingredients: string[],
        procedure: string[],
        images: string[],
        category: string,
        average_rating: number,
        views: number,
        __v: number
}

export const CreateRecipe = () => {

    const [ingre, setIngre] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');
    const [proce, setProce] = useState<string[]>([]);
    const [newProcedure, setNewProcedure] = useState<string>('');
    const [form, setForm] = useState<Partial<Recipe>>({
        title: '',
        ingredients: [''],
        procedure: [''],

    });
    
    const addIngredient = (i: string) => {
        setIngre([
            ...ingre, i
        ])
        setForm({
            ...form,
            ingredients: [...ingre, i],
        })
        setNewIngredient('')
    }
    const removeIngredient = (ingredient: string) => {
        const newArray = ingre.filter(item => item !== ingredient);
        setIngre(newArray);
        setForm({
            ...form,
            ingredients: newArray
        })
    };
    
    const addProcedure = (p: string) => {
        setProce([
            ...proce, p
        ])
        setForm({
            ...form,
            procedure:[...proce, p]
        })
        setNewProcedure('')
    }
    const removeProcedure = (procedure: string) => {
        const newArray = proce.filter(item => item !== procedure);
        setProce(newArray);
        setForm({
            ...form,
            procedure: newArray
        })
    };

    const addTitle = (t: string) => {
        setForm({
            ...form,
            title: t
        })
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
                            value={form.title}
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
                                {ingre.map((i, index) => (
                                    <li key={index} className="createRecipe__half-ingredients-list-l">
                                        {i}<label>  </label>  
                                        <button 
                                            className="createRecipe__half-ingredients-list-l-b" 
                                            onClick={() => removeIngredient(i)}>
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
                                {proce.map((p, index) => (
                                    <li key={index} className="createRecipe__half-procedure-list-l">
                                        {p}<label> </label>
                                        <button
                                            className="createRecipe__half-procedure-list-l-b"
                                            onClick={() => removeProcedure(p)}
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
                                onClick={({})=>{
                                    console.log(form)
                                }}
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