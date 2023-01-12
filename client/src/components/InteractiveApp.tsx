//@ts-nocheck
import { MapWithHeatmap } from "./Interactives/Map";
import { useState } from "react";
import Select from "react-select";


export function InteractiveApp(){

    const options = [
        { value: 'green', label: 'Zielone Miasto' },
        { value: 'innovative', label: 'Innowacyjne Miasto' },
        { value: 'together', label: 'Wspólne Miasto' },
        { value: 'accessible', label: 'Dostępne Miasto' },
        { value: 'custom', label: 'Moje Miasto' }
      ]

    let [category, setCategory] = useState(options[0]);


    

    return (
        <div className="UserApp">
            <h1>{category.label}</h1>
            
            <Select 
            defaultValue={category}
            onChange={setCategory}
            options={options} />

            <MapWithHeatmap/>
        </div>
    )
}