import math
import sqlite3
import database
import os
import atexit
import threading

DB_FILENAME = "city.db"
SOURCE_DIR  = os.path.join(os.path.dirname(os.path.realpath(__file__)), '')
CATEGORIES = ("edukacja", "zdrowie", "rozrywka", "jedzenie", "sport", "kultura", "dzieci", "kawiarnie", "natura", "biznes", "uslugi", "transport_publiczny", "sklepy")
RADIUS = 1000 # in meters
PRECALCULATED_COORDS = ((54.44856818820764, 18.42538889812534),
(54.44856818820764, 18.459952402545106),
(54.44856818820764, 18.494515906964875),
(54.44856818820764, 18.52907941138464),
(54.44856818820764, 18.563642915804408),
(54.43612514796948, 18.42538889812534),
(54.43612514796948, 18.459952402545106),
(54.43612514796948, 18.494515906964875),
(54.43612514796948, 18.52907941138464),
(54.43612514796948, 18.563642915804408),
(54.43612514796948, 18.598206420224173),
(54.42368210773131, 18.42538889812534),
(54.42368210773131, 18.459952402545106),
(54.42368210773131, 18.494515906964875),
(54.42368210773131, 18.52907941138464),
(54.42368210773131, 18.563642915804408),
(54.42368210773131, 18.598206420224173),
(54.41123906749315, 18.42538889812534),
(54.41123906749315, 18.459952402545106),
(54.41123906749315, 18.494515906964875),
(54.41123906749315, 18.52907941138464),
(54.41123906749315, 18.563642915804408),
(54.41123906749315, 18.598206420224173),
(54.41123906749315, 18.63276992464394),
(54.41123906749315, 18.667333429063707),
(54.39879602725498, 18.42538889812534),
(54.39879602725498, 18.459952402545106),
(54.39879602725498, 18.494515906964875),
(54.39879602725498, 18.52907941138464),
(54.39879602725498, 18.563642915804408),
(54.39879602725498, 18.598206420224173),
(54.39879602725498, 18.63276992464394),
(54.39879602725498, 18.667333429063707),
(54.39879602725498, 18.701896933483475),
(54.38635298701682, 18.42538889812534),
(54.38635298701682, 18.459952402545106),
(54.38635298701682, 18.494515906964875),
(54.38635298701682, 18.52907941138464),
(54.38635298701682, 18.563642915804408),
(54.38635298701682, 18.598206420224173),
(54.38635298701682, 18.63276992464394),
(54.38635298701682, 18.667333429063707),
(54.38635298701682, 18.701896933483475),
(54.38635298701682, 18.73646043790324),
(54.37390994677866, 18.42538889812534),
(54.37390994677866, 18.459952402545106),
(54.37390994677866, 18.494515906964875),
(54.37390994677866, 18.52907941138464),
(54.37390994677866, 18.563642915804408),
(54.37390994677866, 18.598206420224173),
(54.37390994677866, 18.63276992464394),
(54.37390994677866, 18.667333429063707),
(54.37390994677866, 18.701896933483475),
(54.37390994677866, 18.73646043790324),
(54.37390994677866, 18.77102394232301),
(54.36146690654049, 18.42538889812534),
(54.36146690654049, 18.459952402545106),
(54.36146690654049, 18.494515906964875),
(54.36146690654049, 18.52907941138464),
(54.36146690654049, 18.563642915804408),
(54.36146690654049, 18.598206420224173),
(54.36146690654049, 18.63276992464394),
(54.36146690654049, 18.667333429063707),
(54.36146690654049, 18.701896933483475),
(54.36146690654049, 18.73646043790324),
(54.36146690654049, 18.77102394232301),
(54.36146690654049, 18.805587446742773),
(54.36146690654049, 18.840150951162542),
(54.36146690654049, 18.874714455582307),
(54.36146690654049, 18.909277960002076),
(54.34902386630233, 18.42538889812534),
(54.34902386630233, 18.459952402545106),
(54.34902386630233, 18.494515906964875),
(54.34902386630233, 18.52907941138464),
(54.34902386630233, 18.563642915804408),
(54.34902386630233, 18.598206420224173),
(54.34902386630233, 18.63276992464394),
(54.34902386630233, 18.667333429063707),
(54.34902386630233, 18.701896933483475),
(54.34902386630233, 18.73646043790324),
(54.34902386630233, 18.77102394232301),
(54.34902386630233, 18.805587446742773),
(54.34902386630233, 18.840150951162542),
(54.34902386630233, 18.874714455582307),
(54.34902386630233, 18.909277960002076),
(54.336580826064164, 18.42538889812534),
(54.336580826064164, 18.459952402545106),
(54.336580826064164, 18.494515906964875),
(54.336580826064164, 18.52907941138464),
(54.336580826064164, 18.563642915804408),
(54.336580826064164, 18.598206420224173),
(54.336580826064164, 18.63276992464394),
(54.336580826064164, 18.667333429063707),
(54.336580826064164, 18.701896933483475),
(54.336580826064164, 18.73646043790324),
(54.336580826064164, 18.77102394232301),
(54.336580826064164, 18.805587446742773),
(54.336580826064164, 18.840150951162542),
(54.336580826064164, 18.874714455582307),
(54.336580826064164, 18.909277960002076),
(54.324137785826004, 18.42538889812534),
(54.324137785826004, 18.459952402545106),
(54.324137785826004, 18.494515906964875),
(54.324137785826004, 18.52907941138464),
(54.324137785826004, 18.563642915804408),
(54.324137785826004, 18.598206420224173),
(54.324137785826004, 18.63276992464394),
(54.324137785826004, 18.667333429063707),
(54.324137785826004, 18.701896933483475),
(54.324137785826004, 18.73646043790324),
(54.324137785826004, 18.77102394232301),
(54.324137785826004, 18.805587446742773),
(54.324137785826004, 18.840150951162542),
(54.324137785826004, 18.874714455582307),
(54.324137785826004, 18.909277960002076),
(54.31169474558784, 18.42538889812534),
(54.31169474558784, 18.459952402545106),
(54.31169474558784, 18.494515906964875),
(54.31169474558784, 18.52907941138464),
(54.31169474558784, 18.563642915804408),
(54.31169474558784, 18.598206420224173),
(54.31169474558784, 18.63276992464394),
(54.31169474558784, 18.667333429063707),
(54.31169474558784, 18.701896933483475),
(54.31169474558784, 18.73646043790324),
(54.31169474558784, 18.77102394232301),
(54.31169474558784, 18.805587446742773),
(54.31169474558784, 18.840150951162542),
(54.31169474558784, 18.874714455582307),
(54.31169474558784, 18.909277960002076),
(54.299251705349675, 18.42538889812534),
(54.299251705349675, 18.459952402545106),
(54.299251705349675, 18.494515906964875),
(54.299251705349675, 18.52907941138464),
(54.299251705349675, 18.563642915804408),
(54.299251705349675, 18.598206420224173),
(54.299251705349675, 18.63276992464394),
(54.299251705349675, 18.667333429063707),
(54.299251705349675, 18.701896933483475),
(54.299251705349675, 18.73646043790324),
(54.299251705349675, 18.77102394232301),
(54.299251705349675, 18.805587446742773),
(54.299251705349675, 18.840150951162542),
(54.299251705349675, 18.874714455582307),
(54.299251705349675, 18.909277960002076),
(54.286808665111515, 18.42538889812534),
(54.286808665111515, 18.459952402545106),
(54.286808665111515, 18.494515906964875),
(54.286808665111515, 18.52907941138464),
(54.286808665111515, 18.563642915804408),
(54.286808665111515, 18.598206420224173),
(54.286808665111515, 18.63276992464394),
(54.286808665111515, 18.667333429063707),
(54.286808665111515, 18.701896933483475),
(54.286808665111515, 18.73646043790324),
(54.286808665111515, 18.77102394232301),
(54.286808665111515, 18.805587446742773),
(54.286808665111515, 18.840150951162542),
(54.286808665111515, 18.874714455582307),
(54.286808665111515, 18.909277960002076),
(54.27436562487335, 18.42538889812534),
(54.27436562487335, 18.459952402545106),
(54.27436562487335, 18.494515906964875),
(54.27436562487335, 18.52907941138464),
(54.27436562487335, 18.563642915804408),
(54.27436562487335, 18.598206420224173),
(54.27436562487335, 18.63276992464394),
(54.27436562487335, 18.667333429063707),
(54.27436562487335, 18.701896933483475),
(54.27436562487335, 18.73646043790324),
(54.27436562487335, 18.77102394232301),
(54.27436562487335, 18.805587446742773),
(54.27436562487335, 18.840150951162542),
(54.27436562487335, 18.874714455582307),
(54.27436562487335, 18.909277960002076))

db = database.connect(SOURCE_DIR + DB_FILENAME)
cursor = db.cursor() 
lock = threading.Lock()


def beforeExit():
    database.close(cursor, db)

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
    
        for row in rows:
            placeCoords = (row[0], row[1])
            if pointIsInCircle(placeCoords, center, radius):
                placesByCategories[category].append(row)

    return placesByCategories

def getPrecalculatedPoints(wages = {category: 1.0 for category in CATEGORIES}):
    #exampleCoords = (54.36990426138277, 18.606150765192282)
    results = []
    for coords in PRECALCULATED_COORDS:
        placesWithinCategories = queryPlacesWithinCategories(coords, RADIUS)
        result = 0.0
        for category, places in placesWithinCategories.items():
            if len(places) > 0:
                result += wages[category]
        results.append({"coordinates": coords[::-1], "value": result})
    return results


if __name__ == "__main__":
    # DIRTY TESTING
    # print(getDistanceBetweenTwoPoints((54.370892, 18.6132158), (54.3893330823781, 18.609979311308994)))

    # res = cursor.execute("SELECT name FROM sqlite_master")
    # print(cursor.fetchall())

    # queryPlaces((54.39014837271083, 18.52922941548349))

    print(getPrecalculatedPoints())

    database.close(cursor, db)