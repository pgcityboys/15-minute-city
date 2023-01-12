import { useEffect, useState } from "react";
import { defaultWeights, weightCategories } from "../../types";
import { SliderComponent } from "./SliderComponent";

export function SliderSet() {

    let [weight, setWeight] = useState(defaultWeights);

    useEffect(() => {
        console.log(weight);
    }, [weight])

    return (
        <div className="Sliders">
            {weightCategories.map((category) => (
                <SliderComponent name={category} setter={setWeight} prev={weight}/>
            ))}
        </div>
    )
}