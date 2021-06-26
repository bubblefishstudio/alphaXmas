from os import environ

from flask import Flask, Response, request
from flask_cors import cross_origin

app = Flask(__name__)

@app.route("/create")
@cross_origin(["http://localhost:8080", "https://bubblefish.studio/alphaXmas"])
def create_postcard():
	return "TODO"

@app.route("/retrieve")
@cross_origin(["http://localhost:8080", "https://bubblefish.studio/alphaXmas"])
def retrieve_postcard():
	return "TODO"
