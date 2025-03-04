import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { v4 as uuid } from 'uuid';

import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch} : FormProps) {
    const [activity, setActivity] = useState<Activity>({
        id: '',
        category: 1,
        name: '',
        calories: 0
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {      
        const value = e.target.id == 'name' ? e.target.value.trim() : +e.target.value;

        setActivity({
            ...activity,
            id: uuid(),
            [e.target.id]: value
        });
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.length > 0 && calories > 0;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'save-activity', payload: { newActivity: activity } });
        setActivity({id: '', category: 1, name: '',calories: 0 });
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Categoría</label>
            <select
                id="category"                
                className="border border-slate-300 p2 rounder-lg w-full bg-white"
                value={activity.category}
                onChange={(e) => handleChange(e)}
            >
                { 
                    categories.map((category, index) => (
                        <option value={category.id} key={index}>{ category.name }</option> 
                    ))
                }
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad</label>
            <input
                id="name"                                
                type="text"
                className="border border-slate-300 p-2 rounder-lg"
                placeholder="Ej: Comerida, Jugo de naranja, Ejercicio, Ensalada, etc"
                value={activity.name}
                onChange={(e) => handleChange(e)}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorías</label>
            <input
                id="calories"                
                type="number"
                min={0}
                className="border border-slate-300 p-2 rounder-lg"
                placeholder="Ejemplo: 100"
                value={activity.calories}   
                onChange={(e) => handleChange(e)}
            />
        </div>

        <input
            type="submit"
            disabled={!isValidActivity()}
            value={ activity.category == 1 ? 'Guardar comida' : 'Guardar ejecicio' }   
            className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-2 font-bold cursor-pointer uppercase disabled:bg-gray-400 disabled:cursor-not-allowed"
        />
    </form>
  )
}
