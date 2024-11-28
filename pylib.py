import json

def getfile(wrap):
    s, m = wrap
    with open(s, "r") as f:
        if m == "r": return f.read()
        elif m == "rl": return f.readlines()
        elif m == "jl": return json.load(f)

def build_form(debug = False):
    # with open("build.html", "r") as f:
    #     bh = f.readlines()
    # with open("dynamic_build.js", "r") as f:
    #     dbj = f.readlines()
    # with open("dynamic_build.js", "r") as f:
    #     dbj = f.readlines()
    # with open("hobints.json", "r") as f:
    #     hijs = f.read()
    # with open("global_config.json", "r") as f:
    #     gcjs = json.load(f)
    sources = [
        ("build.html", "rl"),
        ("dynamic_build.js", "rl"),
        ("form.css", "rl"),
        ("hobints.json", "r"),
        ("global_config.json", "jl")
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
        with open("build_out.html", "w") as f:
            f.write(out)
    return out