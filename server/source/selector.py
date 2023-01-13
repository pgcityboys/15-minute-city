import math
import sqlite3
import database
import os
import atexit
import threading
import json
import csv

DB_FILENAME = "city.db"
RESULTS_FILENAME = "results.json"
COORDS_FILENAME = "coords_to_pregenerate.csv"
SOURCE_DIR  = os.path.join(os.path.dirname(os.path.realpath(__file__)), '')
CATEGORIES = ("edukacja", "zdrowie", "rozrywka", "jedzenie", "sport", "kultura", "dzieci", "kawiarnie", "natura", "biznes", "uslugi", "transport", "sklepy")
RADIUS = 1000 # in meters
PRECALCULATED_COORDS = []

with open(SOURCE_DIR + COORDS_FILENAME, 'r') as coords:
  csvreader = csv.reader(coords)
  for row in csvreader:
    lat = float(row[0])
    lon = float(row[1])
    PRECALCULATED_COORDS.append((lat, lon))
    if (lat >= 54.291+0.005 and lon < 18.755-0.01): # add additional points between to fill gaps 
        PRECALCULATED_COORDS.append((lat-0.005, lon+0.01)) 

db = database.connect(SOURCE_DIR + DB_FILENAME)
cursor = db.cursor() 
lock = threading.Lock()


def beforeExit():
    try:
        database.close(cursor, db)
    except sqlite3.ProgrammingError:
        pass

atexit.register(beforeExit)

# https://stackoverflow.com/a/12997900
def calculateDerivedPosition(point, range, bearing):
        EarthRadius = 6371000

        latA = math.radians(point[0])
        lonA = math.radians(point[1])
        angularDistance = range / EarthRadius
        trueCourse = math.radians(bearing)

        lat = math.asin(
                math.sin(latA) * math.cos(angularDistance) +
                        math.cos(latA) * math.sin(angularDistance)
                        * math.cos(trueCourse))

        dlon = math.atan2(
                math.sin(trueCourse) * math.sin(angularDistance)
                        * math.cos(latA),
                math.cos(angularDistance) - math.sin(latA) * math.sin(lat))

        lon = ((lonA + dlon + math.pi) % (math.pi * 2)) - math.pi

        lat = math.degrees(lat)
        lon = math.degrees(lon)

        newPoint = (lat, lon)

        return newPoint

def getDistanceBetweenTwoPoints(p1, p2):
        R = 6371000 # earth radius
        dLat = math.radians(p2[0] - p1[0])
        dLon = math.radians(p2[1] - p1[1])
        lat1 = math.radians(p1[0])
        lat2 = math.radians(p2[0])

        a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.sin(dLon / 2) * math.sin(dLon / 2) * math.cos(lat1) * math.cos(lat2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = R * c

        return d

def pointIsInCircle(pointForCheck, center, radius):
        if (getDistanceBetweenTwoPoints(pointForCheck, center) <= radius):
            return True
        else:
            return False

# center: places are queried around center by radius
# radius: radius from center in meters
def queryPlacesWithinCategories(center, radius):
    mult = 1.1 # to be sure each place is considered
   
    # calculate rectangle which will be used to filter places 
    p1 = calculateDerivedPosition(center, mult * radius, 0) # top
    p2 = calculateDerivedPosition(center, mult * radius, 90); # right
    p3 = calculateDerivedPosition(center, mult * radius, 180); # down
    p4 = calculateDerivedPosition(center, mult * radius, 270); # left
 
    inRectangleCondition =  " WHERE " + \
        "lat" + " > " + str(p3[0]) + " AND " + \
        "lat" + " < " + str(p1[0]) + " AND " + \
        "lon" + " < " + str(p2[1]) + " AND " + \
        "lon" + " > " + str(p4[1])

    placesByCategories = {category: [] for category in CATEGORIES}
    for category in CATEGORIES:
        selectString = f"SELECT * FROM {category}" + inRectangleCondition

        try:
            lock.acquire(True)
            cursor.execute(selectString)
            rows = cursor.fetchall()
        finally:
            lock.release()

        placesWithDistance = [] 
        for row in rows:
            placeCoords = (row[0], row[1])
            distance = getDistanceBetweenTwoPoints(placeCoords, center)
            if distance < radius:
                placesWithDistance.append(row + (distance,)) # adding distance as last element of row
        
        placesByCategories[category] = sorted(placesWithDistance, key=lambda x: x[-1])

    return placesByCategories

def getPrecalculatedPoints(wages = {category: 1.0 for category in CATEGORIES}):
    results = []
    try:
        with open(SOURCE_DIR + RESULTS_FILENAME, 'r') as savedResults:
            results = json.load(savedResults)
    except FileNotFoundError:
        # calculate results
        for coords in PRECALCULATED_COORDS:
            placesWithinCategories = queryPlacesWithinCategories(coords, RADIUS)
            result = 0.0
            for category, places in placesWithinCategories.items():
                if len(places) > 0:
                    result += wages[category]
            results.append({"coordinates": coords[::-1], "value": result})

        with open(SOURCE_DIR + RESULTS_FILENAME, 'w') as saveResults:
            json.dump(results, saveResults)

    return results



def getPlacesAroundLocation(coords):
    placesAroundLocation = queryPlacesWithinCategories(coords, RADIUS)
    result = {
            "coordinates": coords, 
            "places": placesAroundLocation
             }
    return result


if __name__ == "__main__":
    # DIRTY TESTING
    # print(getDistanceBetweenTwoPoints((54.370892, 18.6132158), (54.3893330823781, 18.609979311308994)))

    # res = cursor.execute("SELECT name FROM sqlite_master")
    # print(cursor.fetchall())

    # x = queryPlacesWithinCategories((54.39014837271083, 18.52922941548349), 1000)
    # print(x)
    
    # print(getPrecalculatedPoints())

    # y = getPlacesAroundLocation((54.39014837271083, 18.52922941548349))
    # print(y)

    # x = queryPlacesWithinCategories((54.39014837271083, 18.52922941548349), 1000)
    # for y, z in x.items():
    #     print(y, z, end="\n\n")
    
    # print(getPrecalculatedPoints())
    
    pass