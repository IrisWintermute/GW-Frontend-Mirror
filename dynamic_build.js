const br = document.createElement("br");

const hobints = {0:1};
let hobints_selected = {};
const hobints_satisfied = 8;

let sliders = 0;

add_child = function(p_id, e_type, attrs, inner) {
    let p = document.getElementById(p_id);
    let e = document.createElement(e_type);
    attrs.forEach(function(val, key) {
        e.setAttribute(key, val);
    })
    if (inner != undefined) {e.innerHTML = inner}
    p.appendChild(e);
}

load_1 = function() {
    if (document.getElementById("1") != undefined) {return null}
    const d = document.getElementById("form_1");
    const a_label = new Map([
        ["for", "age"],
        ["id", "1"]
    ]);
    const a_input = new Map([
        ["type", "number"],
        ["name", "age"],
        ["min", 0],
        ["max", 130],
        ["onchange", "load_2()"]
    ]);
    add_child("form_1", "label", a_label, "How old are they?");
    d.appendChild(br.cloneNode());
    add_child("form_1", "input", a_input);
}

load_2 = function() {
    if (document.getElementById("2") != undefined) { return null }
    const d = document.getElementById("form_2");
    const a_label = new Map([
        ["for", "hobints"],
        ["id", "2"]
    ]);
    add_child("form_2", "label", a_label, "What are some of their hobbies and interests?");
    d.appendChild(br.cloneNode());
    for (let n in hobints) {
        if (n[n.length - 1] != " ") {continue}
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + n + "')"],
            ["name", "hobby"],
            ["id", n + "_"]
        ]);
        add_child("form_2", "input", a_check);
        const a_label = new Map([
            ["for", n + "_"]
        ]);
        add_child("form_2", "label", a_label, n);
        const a_div = new Map([
            ["id", n]
        ]);
        add_child("form_2", "div", a_div);
    }
    a_label_exit = new Map([
        ["id", "2_exit_label"]
    ])
    add_child("2_exit", "label", a_label_exit, "0 out of " + hobints_satisfied + " hobints selected");

}

rec_get_h = function (entry) {
    if (hobints[entry] == undefined) { return undefined }
    let out = [entry];
    for (let h of hobints[entry]) {
        out.push(h);
        const out_r = rec_get_h(h);
        if (out_r != undefined) {
            for (v of out_r) { out.push(v); }
        }
    }
    return out;
}

load_next = function (s) {
    if (hobints_selected[s] == 1) {
        const div = document.getElementById(s);
        delete hobints_selected[s];
        const local_h = rec_get_h(s);
        if (local_h != undefined) {
            for (h of local_h) {
                delete hobints_selected[h];
            }
        }

        div.innerHTML = "";
        const dbg = document.getElementById("dbg_hobints");
        //dbg.innerHTML = Object.keys(hobints_selected).toString();
        update_2_exit();
        return null;
    }
    hobints_selected[s] = 1;
    const dbg = document.getElementById("dbg_hobints");
    //dbg.innerHTML = Object.keys(hobints_selected).toString();
    update_2_exit();
    for (let n in hobints[s]) {
        const val = hobints[s][n];
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + val + "')"],
            ["name", "hobby"],
            ["id", val + "_"]
        ]);
        add_child(s, "input", a_check);
        const a_label = new Map([
            ["for", val + "_"]
        ]);
        add_child(s, "label", a_label, val);
        const a_div = new Map([
            ["id", val]
        ]);
        add_child(s, "div", a_div);
    }
}

update_2_exit = function() {
    const l = Object.keys(hobints_selected).length;
    const exit_l = document.getElementById("2_exit_label");
    exit_l.innerHTML = l + " out of " + hobints_satisfied + " hobints selected";
    if (l == hobints_satisfied) {
        load_3();
    }
}   

load_3 = function() {
    document.getElementById("form_3").style.display = "block";
}

update_slider = function() {
    if (sliders <= 4) {sliders += 1}
    //document.getElementById("dbg_hobints").innerHTML = sliders;
    if (sliders == 3) {
        load_4();
    }
}

load_4 = function() {
    document.getElementById("form_4").style.display = "inline";
}

update_cost_ceil = function() {
    document.getElementById("ceil").innerHTML = "";
    const v = document.getElementById("min_cost").value;
    const a_label = new Map([
        ["for", "max_cost"]
    ]);
    add_child("ceil", "label", a_label, "And what's your cost ceiling?");
    const a_num = new Map([
            ["type", "number"],
            ["onchange", "load_5()"],
            ["value", v],
            ["min", v],
            ["max", 400],
            ["id", "max_cost"]
        ]);
    add_child("ceil", "input", a_num);

}
