from fasthtml.common import *
from pylib import build_form

# Serve web app using FastHTML

app = FastHTML()

@app.get("/")
def get():
    with open("entry.html", "r") as f:
        return f.read().replace("URL", "http://localhost:5001/build")

@app.get("/build")
def get():
    return build_form()

@app.post("/collect")
def post(profile: str):
    with open("collect.py", "r") as f:
        return f.read()

serve()