const br = document.createElement("br");

const hobints = {0:1};
let hobints_selected = {};

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

reveal = function (id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).style.border = "2px solid black";
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
        ["max", MAX_AGE],
        ["onchange", "load_2()"]
    ]);
    add_child("form_1", "label", a_label, "How old are they?");
    d.appendChild(br.cloneNode());
    add_child("form_1", "input", a_input);
    document.getElementById("name_age").style.border = "2px solid black";
}

load_2 = function() {
    if (document.getElementById("2") != undefined) { return null }
    reveal("form_2_wrap");
    for (let n in hobints) {
        if (n[n.length - 1] != " ") { continue }
        const a_div_pair = new Map([
            ["id", n + "_pair"]
        ]);
        add_child("form_2", "div", a_div_pair);
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + n + "')"],
            ["name", n],
            ["id", n + "_"]
        ]);
        // parent div is form_2_flex when single top div
        add_child(n + "_pair", "input", a_check);
        const a_label = new Map([
            ["for", n + "_"]
        ]);
        add_child(n + "_pair", "label", a_label, n);
        const a_div = new Map([
            ["id", n],
            ["class", "flex"]
        ]);
        add_child("form_2", "div", a_div);
        document.getElementById("2_exit").style.display = "block";
    }
    

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
        div.innerHTML = "";
        delete hobints_selected[s];
        const local_h = rec_get_h(s);
        if (local_h != undefined) {
            for (h of local_h) {
                delete hobints_selected[h];
            }
        }

        update_2_exit();
        return null;
    }
    hobints_selected[s] = 1;
    update_2_exit();
    for (let n in hobints[s]) {
        const val = hobints[s][n];
        const a_div_pair = new Map([
            ["id", val + "_pair"]
        ]);
        add_child(s, "div", a_div_pair);
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + val + "')"],
            ["name", val],
            ["id", val + "_"]
        ]);
        add_child(val + "_pair", "input", a_check);
        const a_label = new Map([
            ["for", val + "_"]
        ]);
        add_child(val + "_pair", "label", a_label, val);
        const a_div = new Map([
            ["id", val],
            ["class", "flex"]
        ]);
        add_child(s, "div", a_div);
    }
}

update_2_exit = function() {
    const l = Object.keys(hobints_selected).length;
    const exit_l = document.getElementById("2_exit_p");
    exit_l.innerHTML = l + " out of " + HOBINTS_SATISFIED + " hobints selected";
    if (l == HOBINTS_SATISFIED && document.getElementById("form_3_pre").innerHTML == "") {
        reveal("form_3");
    }
}

reveal_comp_wrap = function() {
    if (document.getElementById("min_cost").value < document.getElementById("max_cost").value) {
        reveal("form_5");
    }
}

update_slider = function() {
    if (sliders <= 4) {sliders += 1}
    if (sliders == 3) {
        reveal("form_4");
    }
}

update_l_1 = function () {
    reveal("form_5");
    const label_1 = document.getElementById("s_l_1");
    const v_1 = document.getElementById("s_c_1");
    const v_2 = document.getElementById("s_c_2");

    if ( parseInt(v_2.value) - parseInt(v_1.value) <= PRICE_STEP) {
        v_1.value = parseInt(v_2.value) - PRICE_STEP;
    } 
    label_1.innerHTML = v_1.value;
    label_1.style["margin-left"] = ((v_1.value * (85.5 / MAX_PRICE)) + 4.5) + "%";
}

update_l_2 = function () {
    reveal("form_5");
    const label_2 = document.getElementById("s_l_2");
    const v_1 = document.getElementById("s_c_1");
    const v_2 = document.getElementById("s_c_2");

    if (parseInt(v_2.value) - parseInt(v_1.value) <= PRICE_STEP) {
        v_2.value = parseInt(v_1.value) + PRICE_STEP;
    }
    label_2.innerHTML = v_2.value;
    label_2.style["margin-left"] = ((v_2.value * (85.5 / MAX_PRICE)) + 4.5) + "%";
}