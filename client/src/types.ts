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
    "transport_publiczny": number,
    "sklepy": number
}

export type heatmapData = {coordinates: [number, number], value: number}[];