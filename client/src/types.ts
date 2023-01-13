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

const greenWeights: weightData = {
    "edukacja": 7,
    "zdrowie": 5, 
    "rozrywka": 4, 
    "jedzenie": 3, 
    "sport": 9, 
    "kultura": 7, 
    "dzieci": 8,
    "kawiarnie": 2, 
    "natura": 10, 
    "biznes": 2, 
    "uslugi": 5, 
    "transport": 8,
    "sklepy": 4
}

export const defaultCategories = {
    'green': greenWeights,
    'innovative': defaultWeights,
    'together': defaultWeights,
    'accessible': defaultWeights
}

export const weightCategories = ['zdrowie', 'edukacja', 'rozrywka', 'jedzenie', 'sport', 'kultura', 'dzieci', 'kawiarnie', 'natura', 'biznes', 'uslugi', 'transport', 'sklepy']