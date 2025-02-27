import { ChangeEvent, useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";

export default function Form() {
    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {      
        const value = e.target.id == 'name' ? e.target.value.trim() : +e.target.value;

        setActivity({
            ...activity,
            [e.target.id]: value
        });
    }

    const isValidActivity = () => {
        const { name, calories } = activity;
        return name.length > 0 && calories > 0;
    }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Categoría</label>
            <select
                id="category"                
                className="border border-slate-300 p2 rounder-lg w-full bg-white"
                defaultValue={activity.category}
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
                defaultValue={activity.name}
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
                defaultValue={activity.calories}   
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
