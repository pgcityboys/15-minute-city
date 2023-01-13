import { useEffect, useState } from "react";
import { defaultWeights, weightCategories, weightData } from "../../types";
import { SliderComponent } from "./SliderComponent";

type props = {
    onValuesModified: () => void,
    onFormSubmitted: (weights: weightData) => void,
    categoryData: weightData
}

export function SliderSet({onValuesModified, onFormSubmitted, categoryData} : props) {

    let [weight, setWeight] = useState(defaultWeights);

    const handleSubmit = () => {
        onFormSubmitted(weight);
    }

    useEffect(() => {
        console.log(weight);
        onValuesModified();
    }, [weight])

    useEffect(() => {
        if(categoryData!=undefined){
            setWeight(categoryData)
        }
        
    }, [categoryData])

    return (
        <div className="Sliders">
            {weightCategories.map((category) => (
                <SliderComponent name={category} setter={setWeight} prev={weight} key={category}/>
            ))}
            <div className="SliderWrapper">
                <button onClick={handleSubmit}> Confirm </button>
            </div>
        </div>
    )
}