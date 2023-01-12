
import { heatmapData, weightData } from "../types";

const API_URL = 'http://localhost:3001/api/all';

const testData: heatmapData = [{coordinates: [18.493331, 54.560836], value: 0.4},
                        {coordinates: [18.464911, 54.465758], value: 0.67},
                        {coordinates: [18.57884, 54.43451], value: 0.1},
                        {coordinates: [18.657497, 54.400833], value: 0.5},
                        {coordinates: [18.620274, 54.380279], value: 0.2},
                        {coordinates: [18.635283, 54.353336], value: 200},
                        ];

export async function fetchHeatmapData(weights: weightData): Promise<string> {
    let response = await fetch(new URL(API_URL), {
        method: 'GET',
        //body: JSON.stringify(weights),
    }
    );
    if(!response.ok){
        throw new Error("Error while fetching data drom the API")
    }

    let result = response.json();
    return result;
}