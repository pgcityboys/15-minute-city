
import { heatmapData, tableData, weightData } from "../types";


const API_URL = 'http://localhost:3001/api/all';
const TABLE_API = 'http://localhost:3001/api/';

const testData: heatmapData = [{coordinates: [18.493331, 54.560836], value: 0.4},
                        {coordinates: [18.464911, 54.465758], value: 0.67},
                        {coordinates: [18.57884, 54.43451], value: 0.1},
                        {coordinates: [18.657497, 54.400833], value: 0.5},
                        {coordinates: [18.620274, 54.380279], value: 0.2},
                        {coordinates: [18.635283, 54.353336], value: 200},
                        ];

export const mockData: tableData = {
    "coordinates": [
      54.39014837271083,
      18.52922941548349
    ],
    "places": {
      "biznes": [],
      "dzieci": [
        [
          54.3960491,
          18.5220387,
          "przedszkole",
          "Baza Edukacyjna Le\u015bnego Przedszkola \"Wilczek\"",
          "https://www.google.com/maps/place/Baza+Edukacyjna+Le%C5%9Bnego+Przedszkola+%22Wilczek%22/data=!4m7!3m6!1s0x46fd7536d078bcaf:0x2affc6397870d55!8m2!3d54.3960491!4d18.5220387!16s%2Fg%2F11f715ht4w!19sChIJr7x40DZ1_UYRVQ2Hl2P8rwI?authuser=0&hl=en&rclk=1",
          804.5018281665111
        ],
        [
          54.3961106,
          18.522114,
          "przedszkole",
          "Le\u015bna Baza Wilczek",
          "https://www.google.com/maps/place/Le%C5%9Bna+Baza+Wilczek/data=!4m7!3m6!1s0x46fd757bc117a57d:0x8f15675222d2e2d6!8m2!3d54.3961106!4d18.522114!16s%2Fg%2F11gjm9tjcy!19sChIJfaUXwXt1_UYR1uLSIlJnFY8?authuser=0&hl=en&rclk=1",
          807.2970172025524
        ]
      ],
      "edukacja": [],
      "jedzenie": [
        [
          54.3966893,
          18.5219124,
          "restauracje",
          "Rybak\u00f3wka Fish restaurant",
          "https://www.google.com/maps/place/Rybak%C3%B3wka+Fish+restaurant/data=!4m7!3m6!1s0x46fd755d0a213c85:0x6e476214a0f4f9a9!8m2!3d54.3966893!4d18.5219124!16s%2Fg%2F11b6gp78xj!19sChIJhTwhCl11_UYRqfn0oBRiR24?authuser=0&hl=en&rclk=1",
          867.9763973449149
        ]
      ],
      "kawiarnie": [],
      "kultura": [
        [
          54.395556,
          18.52014,
          "kultura",
          "Pomnik przyrody: sopl\u00f3wka je\u017cowata",
          "https://www.google.com/maps/place/Pomnik+przyrody:+sopl%C3%B3wka+je%C5%BCowata/data=!4m7!3m6!1s0x46fd755d86817bdf:0xb0f878aaf295bd3!8m2!3d54.395556!4d18.52014!16s%2Fg%2F11c5qp1w_c!19sChIJ33uBhl11_UYR01spr4qHDws?authuser=0&hl=en&rclk=1",
          841.3315460311578
        ],
        [
          54.395556,
          18.52014,
          "muzeum",
          "Pomnik przyrody: sopl\u00f3wka je\u017cowata",
          "https://www.google.com/maps/place/Pomnik+przyrody:+sopl%C3%B3wka+je%C5%BCowata/data=!4m7!3m6!1s0x46fd755d86817bdf:0xb0f878aaf295bd3!8m2!3d54.395556!4d18.52014!16s%2Fg%2F11c5qp1w_c!19sChIJ33uBhl11_UYR01spr4qHDws?authuser=0&hl=en&rclk=1",
          841.3315460311578
        ],
        [
          54.3971519,
          18.5215024,
          "kultura",
          "Dawna le\u015bnicz\u00f3wka \u201eDolina Rado\u015bci\u201d",
          "https://www.google.com/maps/place/Dawna+le%C5%9Bnicz%C3%B3wka+%E2%80%9EDolina+Rado%C5%9Bci%E2%80%9D/data=!4m7!3m6!1s0x46fd75df5bc6ca19:0x1c716b1f35489ab8!8m2!3d54.3971519!4d18.5215024!16s%2Fg%2F11j9djfs4d!19sChIJGcrGW991_UYRuJpINR9rcRw?authuser=0&hl=en&rclk=1",
          925.5821953065769
        ],
        [
          54.3927762,
          18.5153989,
          "kultura",
          "Dawny M\u0142yn XX",
          "https://www.google.com/maps/place/Dawny+M%C5%82yn+XX/data=!4m7!3m6!1s0x46fd759776ad2a7b:0x6bcb42fbfca95813!8m2!3d54.3927762!4d18.5153989!16s%2Fg%2F11jkxm7580!19sChIJeyqtdpd1_UYRE1ip_PtCy2s?authuser=0&hl=en&rclk=1",
          941.8941443096413
        ]
      ],
      "natura": [],
      "rozrywka": [
        [
          54.394574,
          18.5176666,
          "atrakcje",
          "Tablica informacyjna Le\u015bnictwa Matemblewo",
          "https://www.google.com/maps/place/Tablica+informacyjna+Le%C5%9Bnictwa+Matemblewo/data=!4m7!3m6!1s0x46fd758a9f09ce75:0x9afeedffcd5c13e9!8m2!3d54.394574!4d18.5176666!16s%2Fg%2F11h8kty_m8!19sChIJdc4Jn4p1_UYR6RNczf_t_po?authuser=0&hl=en&rclk=1",
          895.8554357950924
        ],
        [
          54.3886667,
          18.5155832,
          "atrakcje",
          "Dolina Bobr\u00f3w",
          "https://www.google.com/maps/place/Dolina+Bobr%C3%B3w/data=!4m7!3m6!1s0x46fd75e56b347733:0x5069f13f008f252b!8m2!3d54.3886667!4d18.5155832!16s%2Fg%2F11hftmcnwv!19sChIJM3c0a-V1_UYRKyWPAD_xaVA?authuser=0&hl=en&rclk=1",
          898.7653852147537
        ]
      ],
      "sklepy": [],
      "sport": [],
      "transport": [],
      "uslugi": [],
      "zdrowie": []
    }
  };

export async function fetchHeatmapData(weights: weightData): Promise<string> {
    let response = await fetch(new URL(API_URL), {
        method: 'POST',
        body: JSON.stringify(weights)
    }
    );
    if(!response.ok){
        throw new Error("Error while fetching data drom the API")
    }

    let result = response.json();
    return result;
}

export async function fetchTableData(lat: number, lon: number): Promise<string> {
    let response = await fetch(new URL(TABLE_API + lat + ':' + lon), {
        method: 'GET',
    });
    if(!response.ok){
        throw new Error("Error while fetching data drom the API")
    }
    let result = response.json();
    return result;
}

