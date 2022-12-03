import flask
from flask import request, jsonify, json, Response
from flask import Flask
from flask_cors import CORS

import scrapData

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)


@app.route('/', methods=['GET'])
def home():
    results = scrapData.main(scrapData.phase2)
    results = str(results)
    print(results)
    return results


app.run(host="0.0.0.0")
