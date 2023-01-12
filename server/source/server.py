from flask import Flask, Response, jsonify
from waitress import serve

app = Flask("air_quality_backend")


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
    response = jsonify("test", lat, lon)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/api/all', methods=['GET'])
def get_all_data():
    response = jsonify("all")
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    serve(app, host="localhost", port=3001)