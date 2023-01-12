import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import {HeatmapLayer} from '@deck.gl/aggregation-layers/typed';
import 'mapbox-gl/dist/mapbox-gl.css';



const API_KEY = 'pk.eyJ1IjoibXJvY2hueSIsImEiOiJjbGJmY2hiamQwNTVoM3ZzMndzNGNodmN4In0.bSbi4473dvEs_RCJYHENZA' //please don't steal, here only for the convenience of grading

type MapData = {coordinates: [number, number], value: number}[]
const testData: MapData = [{coordinates: [18.493331, 54.560836], value: 1},
                        {coordinates: [18.464911, 54.465758], value: 0},
                        {coordinates: [18.57884, 54.43451], value: 0},
                        {coordinates: [18.657497, 54.400833], value: 0},
                        {coordinates: [18.620274, 54.380279], value: 0},
                        {coordinates: [18.635283, 54.353336], value: 0},
                        ];

const INITIAL_VIEW_STATE = {
    longitude: 18.493331,
    latitude: 54.560836,
    zoom: 9,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
    };
    
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';


export function MapWithHeatmap({
    intensity = 1,
    threshold = 0.03,
    radiusPixels = 200,
    mapStyle = MAP_STYLE,
    data = testData
    }){

   

    const layers = [
        new HeatmapLayer({
        data,
        id: 'heatmp-layer',
        pickable: false,
        getPosition: d => d.coordinates,
        getWeight: d => d.value,
        radiusPixels,
        intensity,
        threshold,
        aggregation: 'SUM'
        })
    ];


    return (
        <div style={{position:'relative', width: '50%', height: '50vh', margin: '2rem'}}>
            <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
                <StaticMap reuseMaps mapStyle={mapStyle} mapboxAccessToken={API_KEY}/>
            </DeckGL>
        </div> 
    )
}