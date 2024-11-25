import json
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
with open("build_out.html", "w") as f:
    f.write(out)
    print("Page generated and saved.")