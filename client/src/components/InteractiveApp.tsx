//@ts-nocheck
import { MapWithHeatmap } from "./Interactives/Map";
import { useState, useEffect } from "react";
import { fetchHeatmapData } from "../api/api";
import Select from "react-select";
import { heatmapData, weightData } from "../types";


export function InteractiveApp(){

    const options = [
        { value: 'green', label: 'Zielone Miasto' },
        { value: 'innovative', label: 'Innowacyjne Miasto' },
        { value: 'together', label: 'Wspólne Miasto' },
        { value: 'accessible', label: 'Dostępne Miasto' },
        { value: 'custom', label: 'Moje Miasto' }
      ]

    const defaultWeights: weightData = {
        "edukacja": 1,
        "zdrowie": 1, 
        "rozrywka": 1, 
        "jedzenie": 1, 
        "sport": 1, 
        "kultura": 1, 
        "dzieci": 1,
        "kawiarnie": 1, 
        "natura": 1, 
        "biznes": 1, 
        "uslugi": 1, 
        "transport_publiczny": 1,
        "sklepy": 1
    }

    let [category, setCategory] = useState(options[0]);
    let [heatData, setHeatData] = useState([]);

      useEffect(() => {
        getData();
      }, [category]);

    const getData = () => {
        fetchHeatmapData(defaultWeights).then((response) => {
            let res = response as heatmapData;
            setHeatData(res);
        })
    }

    return (
        <div className="UserApp">
            <h1>{category.label}</h1>
            
            <Select 
            defaultValue={category}
            onChange={setCategory}
            options={options} 
            color={"#116466"}/>
            <div className="MapPart">
                <MapWithHeatmap data={heatData}/>
                
            </div>
        </div>
    )
}