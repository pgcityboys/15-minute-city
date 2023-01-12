//@ts-nocheck
import { MapWithHeatmap } from "./Interactives/Map";
import { useState, useEffect } from "react";
import { fetchHeatmapData } from "../api/api";
import Select from "react-select";
import { heatmapData, weightData, defaultWeights } from "../types";
import { SliderSet } from "./Interactives/SliderSet";


export function InteractiveApp(){
    

        
    const options = [
            { value: 'green', label: 'Zielone Miasto' },
            { value: 'innovative', label: 'Innowacyjne Miasto'},
            { value: 'together', label: 'Wspólne Miasto'},
            { value: 'accessible', label: 'Dostępne Miasto' },
            { value: 'custom', label: 'Moje Miasto' }
        ]


        const colourStyles = {
        
            option: (styles, { data, isDisabled, isFocused, isSelected }, base) => {
              // const color = chroma(data.color);
              console.log({ data, isDisabled, isFocused, isSelected });
              return {
                ...styles,
                backgroundColor: isFocused ? " #46a58a" : "#116466",
                color: "#333333"
              };
            },
            control: (base, state) => ({
                ...base,
                background: "#a88566",
                // Overwrittes the different states of border
                 borderColor: "#a88566",
                // Removes weird border around container
                boxShadow: state.isFocused ? null : null,
                "&:hover": {
                    // Overwrittes the different states of border
                    borderColor: "#a88566"}
              })
          };
    

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
            className="react-select-container"
            classNamePrefix="react-select"
            defaultValue={category}
            onChange={setCategory}
            options={options}     
            styles={colourStyles}

            />

            
            <div className="MapPart">
            <MapWithHeatmap
            options={options} 
            color={"#116466"}
            data={heatData}/>
            <SliderSet />
            </div>
        </div>
    )
}