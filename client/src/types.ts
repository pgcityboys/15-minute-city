export type weightData = {
    "edukacja": number,
    "zdrowie": number, 
    "rozrywka": number, 
    "jedzenie": number, 
    "sport": number, 
    "kultura": number, 
    "dzieci": number,
    "kawiarnie": number, 
    "natura": number, 
    "biznes": number, 
    "uslugi": number, 
    "transport": number,
    "sklepy": number
}

export type heatmapData = {coordinates: [number, number], value: number}[];

export const defaultWeights: weightData = {
    "edukacja": 1,
    "zdrowie": 1, 
    "rozrywka": 1, 
    "jedzenie": 1, 
    "sport": 1, 
    "kultura": 1, 
    "dzieci": 1,
    "kawiarnie": 1, 
    "natura": 1, 
    "biznes": 1, 
    "uslugi": 1, 
    "transport": 1,
    "sklepy": 1
}

export const weightCategories = ['zdrowie', 'edukacja', 'rozrywka', 'jedzenie', 'sport', 'kultura', 'dzieci', 'kawiarnie', 'natura', 'biznes', 'uslugi', 'transport', 'sklepy']