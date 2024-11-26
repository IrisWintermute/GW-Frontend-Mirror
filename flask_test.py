from flask import Flask, request
from app_serve import build_form
import json

# Serve web app using Flask

app = Flask(__name__)

@app.route("/")
def entry():
    with open("entry.html", "r") as f:
        return f.read().replace("URL", "http://127.0.0.1:5000/build")

@app.get("/build")
def get():
    return build_form()

@app.get("/collect")
def collect_get():
    with open("collect.html", "r") as f:
        return f.read()

@app.post("/collect")
def collect_post():
    print(request.form)
    with open("test.json", "w") as f:
        json.dump(request.form, f)
    