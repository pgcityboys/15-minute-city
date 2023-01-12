import StaticMap from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import {HeatmapLayer} from '@deck.gl/aggregation-layers/typed';
import 'mapbox-gl/dist/mapbox-gl.css';
import { heatmapData } from "../../types";
import { useState } from 'react';
import { Viewport } from '@deck.gl/core/typed';


const API_KEY = 'pk.eyJ1IjoibXJvY2hueSIsImEiOiJjbGJmY2hiamQwNTVoM3ZzMndzNGNodmN4In0.bSbi4473dvEs_RCJYHENZA' //please don't steal, here only for the convenience of grading


const testData: heatmapData = [{coordinates: [18.493331, 54.560836], value: 0.4},
                        {coordinates: [18.464911, 54.465758], value: 0.67},
                        {coordinates: [18.57884, 54.43451], value: 0.1},
                        {coordinates: [18.657497, 54.400833], value: 0.5},
                        {coordinates: [18.620274, 54.380279], value: 0.2},
                        {coordinates: [18.635283, 54.353336], value: 0.5},
                        ];

const INITIAL_VIEW_STATE = {
    longitude: 18.620274, 
    latitude: 54.380279,
    zoom: 11.35,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
    };

type Color = [number, number, number, number]
const COLOR_SCHEME: Color[] = [[254,235,226, 150], [252,197,192, 150], [250,159,181, 150], [247,104,161, 150], [197,27,138, 150], [122,1,119, 150]];
    
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
        radiusPixels: radiusPixels,
        intensity,
        threshold,
        aggregation: 'MEAN',
        colorRange: COLOR_SCHEME,
        debounceTimeout: 200000
        })
    ];



    return (
        <div className="MapContainer">
            <div style={{position:'relative', width: '70%', height: '70vh', margin: '2rem'}}>
            <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={layers}>
                <StaticMap reuseMaps={false} mapStyle={mapStyle} mapboxAccessToken={API_KEY} onZoom={(e) => alert("chuj123")}/>
            </DeckGL>
            </div> 
        </div>
    )
}