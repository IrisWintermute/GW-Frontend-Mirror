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
    const d = document.getElementById("form_2");
    // const a_label = new Map([
    //     ["for", "hobints"],
    //     ["id", "2"]
    // ]);
    add_child("form_2_pre", "p", new Map([]), "What are some of their hobbies and interests?");
    d.appendChild(br.cloneNode());
	// const a_div_flex = new Map([
	// 	["id", "form_2_flex"],
	// 	["class", "flex"]
	// ]);
	// add_child("form_2", "div", a_div_flex);
    for (let n in hobints) {
        if (n[n.length - 1] != " ") { continue }
        const a_div_pair = new Map([
            ["id", n + "_pair"]
        ]);
        add_child("form_2", "div", a_div_pair);
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + n + "')"],
            ["name", "hobby"],
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
        document.getElementById("form_2").style.border = "2px solid black";
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
		// nested divs -> empty parent div
        const div = document.getElementById(s);
        div.innerHTML = "";
        delete hobints_selected[s];
        const local_h = rec_get_h(s);
        if (local_h != undefined) {
            for (h of local_h) {
				// single top div -> remove checkbox via id
                // if (document.getElementById(h) != null) {
                //     document.getElementById(h).remove();
                //     document.getElementById(h + "_").remove();
                // }
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
        // id="val_" when only div has id val
        const a_div_pair = new Map([
            ["id", val + "_pair"]
        ]);
        add_child(s, "div", a_div_pair);
        const a_check = new Map([
            ["type", "checkbox"],
            ["onclick", "load_next('" + val + "')"],
            ["name", "hobby"],
            ["id", val + "_"]
        ]);
        add_child(val + "_pair", "input", a_check);
        const a_label = new Map([
            ["for", val + "_"]
        ]);
		// id="s" when label+checkbox are added to local div
        // id="form_2" when label+checkbox added to single top div
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
    if (l == HOBINTS_SATISFIED) {
        reveal("form_3");
        add_child("form_3_pre", "p", new Map([]), "What kind of gift do you want to get them?");
    }
}   

reveal = function(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).style.border = "2px solid black";
}

update_slider = function() {
    if (sliders <= 4) {sliders += 1}
    if (sliders == 3) {
        reveal("form_4");
    }
}

update_cost_ceil = function() {
    document.getElementById("form_5").style["max_width"] = "20%";
    document.getElementById("ceil").innerHTML = "";
    const v = document.getElementById("min_cost").value;
    const a_label = new Map([
        ["for", "max_cost"]
    ]);
    add_child("ceil", "label", a_label, "And what's your cost ceiling? ");
    const a_num = new Map([
            ["type", "number"],
            ["onchange", 'reveal("form_5")'],
            ["value", v],
            ["min", v],
            ["max", MAX_PRICE],
            ["id", "max_cost"]
        ]);
    add_child("ceil", "input", a_num);

}
