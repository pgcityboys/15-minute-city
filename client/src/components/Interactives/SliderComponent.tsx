import ReactSlider from "react-slider";
import { weightData } from "../../types";

type props = {
    name: string,
    prev: weightData,
    setter: React.Dispatch<React.SetStateAction<weightData>>
}
export function SliderComponent(props: props) {

return(
    <div>
            <h1>{props.name}</h1>
            <ReactSlider
                className="horizontal-slider"
                marks
                markClassName="slider-mark"
                min={0}
                max={10}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                onChange={(value, index) => props.setter({
                    ...props.prev,
                    [props.name]: value
                })}
                //@ts-ignore
                value={props.prev[props.name]}
            />
    </div>
)
    
}