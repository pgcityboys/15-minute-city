import { useEffect, useState } from "react";
import { defaultWeights, weightCategories, weightData } from "../../types";
import { SliderComponent } from "./SliderComponent";

type props = {
    onValuesModified: () => void,
    onFormSubmitted: (weights: weightData) => void
}

export function SliderSet(props: props) {

    let [weight, setWeight] = useState(defaultWeights);

    useEffect(() => {
        console.log(weight);
        props.onValuesModified();
        props.onFormSubmitted(weight);
    }, [weight])

    return (
        <div className="Sliders">
            {weightCategories.map((category) => (
                <SliderComponent name={category} setter={setWeight} prev={weight} key={category}/>
            ))}
        </div>
    )
}