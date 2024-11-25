from fasthtml.common import *

app = FastHTML()

# Non app-related python functions
debug = True
def build_form():
    with open("build.html", "r") as f:
        bh = f.readlines()
    with open("dynamic_build.js", "r") as f:
        dbj = f.readlines()
    with open("hobints.json", "r") as f:
        hijs = f.read()
    with open("global_config.json", "r") as f:
        gcjs = json.load(f)

    x = bh.index("<script>\n")
    out_l = bh[:x + 1] + dbj + bh[x + 1:]
    out = "".join(out_l)
    out = out.replace("{0:1}", hijs)
    for v in gcjs.keys():
        out = out.replace(v, str(gcjs[v]))
    if debug:
        with open("build_out.html", "w") as f:
            f.write(out)
    return out
    

@app.get("/")
def get():
    with open("entry.html", "r") as f:
        return f.read()

@app.get("/build")
def get():
    return build_form()

@app.post("/collect.py")
def post():
    with open("collect.py", "r") as f:
        return f.read()

serve()