import sqlite3

def connect(db_file):
    con = None
    try:
        con = sqlite3.connect(db_file, check_same_thread=False)
    except Exception as e:
        print(e)
        raise e

    return con

def close(cursor, db):
    cursor.close()
    db.close()