from flask import Flask, request
from pylib import build_form
import json

# Serve web app using Flask

app = Flask(__name__)

vercel_url = "gw-frontend.vercel.app"
vercel = True
if vercel:
    url = vercel_url
else:
    url = "http://127.0.0.1:5000"
@app.route("/")
def entry():
    with open("entry.html", "r") as f:
        return f.read().replace("URL", url + "/build")

@app.get("/build")
def get():
    return build_form()

@app.get("/collect")
def collect_get():
    with open("collect.html", "r") as f:
        return f.read()

@app.post("/collect")
def collect_post():
    with open("dump/test.json", "w") as f:
        json.dump(request.form, f)
    # insert request.form into profile database
    # add browser cookie with profile uid
    profiles = request.cookies.get("GW_profiles")
    uid = add_form_to_db(request.form)
    n = request.form.name
    n_c = profiles.count(n)
    if n_c > 1:
        n += " - " + str(n_c)
    profiles += n + ":" + uid + "\n"
    resp = make_response(render_template("collect.html"))
    resp.set_cookie("GW_profiles", profiles)
    