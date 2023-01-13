import { useEffect, useState } from "react";
import { defaultWeights, weightCategories } from "../../types";
import { SliderComponent } from "./SliderComponent";

type props = {
    onValuesModified: () => void,
    onFormSubmitted: () => void
}

export function SliderSet(props: props) {

    let [weight, setWeight] = useState(defaultWeights);

    useEffect(() => {
        console.log(weight);
        props.onValuesModified();
    }, [weight])

    return (
        <div className="Sliders">
            {weightCategories.map((category) => (
                <SliderComponent name={category} setter={setWeight} prev={weight}/>
            ))}
        </div>
    )
}