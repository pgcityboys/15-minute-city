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
};

export type heatmapData = {coordinates: [number, number], value: number}[];




export type place = [
    lat: number,
    lon: number,
    type: string,
    title: string,
    link: string,
    distance: number
]



export type places = {
    "biznes": Array<place>,
    "dzieci": Array<place>,
    "edukacja": Array<place>,
    "jedzenie": Array<place>,
    "kawiarnie": Array<place>,
    "kultura": Array<place>,
    "natura": Array<place>,
    "rozrywka": Array<place>,
    "sklepy": Array<place>,
    "sport": Array<place>,
    "transport": Array<place>,
    "uslugi": Array<place>,
    "zdrowie": Array<place>
}


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
    "edukacja": 5,
    "zdrowie": 7, 
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

const innovativeWeights: weightData = {
    "edukacja": 6,
    "zdrowie": 4, 
    "rozrywka": 10, 
    "jedzenie": 9, 
    "sport": 5, 
    "kultura": 9, 
    "dzieci": 3,
    "kawiarnie": 9, 
    "natura": 7, 
    "biznes": 4, 
    "uslugi": 8, 
    "transport": 6,
    "sklepy": 5
}

const togetherWeights: weightData = {
    "edukacja": 10,
    "zdrowie": 10, 
    "rozrywka": 6, 
    "jedzenie": 6, 
    "sport": 6, 
    "kultura": 10, 
    "dzieci": 10,
    "kawiarnie": 5, 
    "natura": 6, 
    "biznes": 8, 
    "uslugi": 8, 
    "transport": 9,
    "sklepy": 7
}

const accesibleWeights: weightData = {
    "edukacja": 7,
    "zdrowie": 8, 
    "rozrywka": 8, 
    "jedzenie": 6, 
    "sport": 5, 
    "kultura": 5, 
    "dzieci": 7,
    "kawiarnie": 6, 
    "natura": 7, 
    "biznes": 10, 
    "uslugi": 10, 
    "transport": 9,
    "sklepy": 10
}

export const defaultCategories = {
    'green': greenWeights,
    'innovative': innovativeWeights,
    'together': togetherWeights,
    'accessible': accesibleWeights
}

export const weightCategories = ['zdrowie', 'edukacja', 'rozrywka', 'jedzenie', 'sport', 'kultura', 'dzieci', 'kawiarnie', 'natura', 'biznes', 'uslugi', 'transport', 'sklepy']
export type tableData = {
    coordinates: [number, number],
    places: places
}
