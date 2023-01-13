from flask import Flask, Response, jsonify
from flask_cors import CORS
from waitress import serve
import selector

app = Flask("air_quality_backend")
CORS(app)


@app.route("/")
def info_page():
    response = jsonify("This is API server for retrieving data. Please use /api/...")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.errorhandler(404)
def page_not_found(error):
    return info_page()

@app.route('/api/<lat>:<lon>', methods=['GET'])
def get_location_data(lat, lon):
    data = selector.getPlacesAroundLocation((float(lat), float(lon)))
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/api/all', methods=['GET'])
def get_all_data():
    data = selector.getPrecalculatedPoints()
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response


if __name__ == "__main__":
    serve(app, host="localhost", port=3001)