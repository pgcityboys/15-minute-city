# 15-minute City Backend

This backend is used as API for retrieving data. It's written with Flask combined with sqlite3 database. 

## Preparing environment
To run server, you have to install all dependencies:
### `pip install -r requirements.txt`
<br />

## Running server
Go to `source` directory and simply run `server.py` script:
### `python server.py`
<br />


## Debugging backend
By default server runs in production mode. If something wrong happens, you can try running it in debug mode to get more details with this command:
### `flask --app server --debug run --host=localhost --port 3001`
<br />

## API
### Retrieving data about all pre-calculated points
- URL: /api/all
- Body: JSON with category wages e.g. `{"healthcare": 2.0, "sport": 1.0, ...}`
- Returns: JSON with results for each location in pre-defined grid e.g. `[{"coordinates": "[18.6163277, 54.3716751]", "value": 21.3}...]` 
### Retrieving data about specific location
- URL: /api/&lt;lat&gt;:&lt;lon&gt;
- Body: Empty
- Returns: JSON with results for this location with places e.g. `{"coordinates": "[18.6163277, 54.3716751]", places: {...}}` 