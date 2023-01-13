import { useEffect, useState } from "react";
import { defaultWeights, weightCategories, weightData } from "../../types";
import { SliderComponent } from "./SliderComponent";

type props = {
    onValuesModified: () => void,
    onFormSubmitted: (weights: weightData) => void,
    categoryData: weightData
}

export function SliderSet(props: props) {

    let [weight, setWeight] = useState(defaultWeights);

    const handleSubmit = () => {
        props.onFormSubmitted(weight);
    }

    useEffect(() => {
        console.log(weight);
        props.onValuesModified();
    }, [weight])

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