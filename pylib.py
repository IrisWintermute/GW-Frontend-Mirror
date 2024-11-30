import json, sqlite3

def getfile(wrap):
    s, m = wrap
    with open(s, "r") as f:
        if m == "r": return f.read()
        elif m == "rl": return f.readlines()
        elif m == "jl": return json.load(f)

def build_form(debug = False):
    sources = [
        ("form_data/build.html", "rl"),
        ("form_data/dynamic_build.js", "rl"),
        ("form_data/form.css", "rl"),
        ("form_data/hobints.json", "r"),
        ("form_data/global_config.json", "jl")
    ]
    bh, dbjs, fc, hij, gcj = tuple(list(map(getfile, sources)))
    x, y = bh.index("<script>\n"), bh.index("<style>\n")
    # script tags come after style tags, so y is still valid after script insertion
    out_l = bh[:x + 1] + dbjs + bh[x + 1:]
    out_l = out_l[:y + 1] + fc + out_l[y + 1:]
    out = "".join(out_l)
    out = out.replace("{0:1}", hij)
    for v in gcj.keys():
        out = out.replace(v, str(gcj[v]))
    if debug:
        with open("dump/build_out.html", "w") as f:
            f.write(out)
    return out

def create_profile_db():
    pass
    con = sqlite3.connect("profiles.db")
    cur = con.cursor()
    for ins in getfile(("create_profile_sql.json", "jl")):
        cur.execute(ins)
    con.commit()


def add_form_to_db():
    return uid