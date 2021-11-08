var attack;
var attack_list = [];

var comboing = true;
document.getElementById("toggle_combo").innerHTML = "Comboing <b> On </b>";
var B2Bing = true
document.getElementById("toggle_B2B").innerHTML = "B2B <b> On </b>";

var combo_level = -1;
var B2B_count = -1;
var B2B_level = 0;
var attack_count = 0;
var total_lines = 0;

var attackHTML = "";
document.getElementById("AttackList").innerHTML = attackHTML;

var attack_dict = {

    // "attackid": ["Name", Base Attack, B2B-able Flag]
    

    "single": ["Single", 0, false],          // attackFunc(combo_level, 0, 0)
    "double": ["Double", 1, false],          // attackFunc(combo_level, 1, 0)
    "triple": ["Triple", 2, false],          // attackFunc(combo_level, 2, 0)
    "quad": ["Quad", 4, true],               // attackFunc(combo_level, 4, B2B_level)
    "tsms": ["T-Spin Mini Single", 0, true], // attackFunc(combo_level, 0, B2B_level)
    "tss": ["T-Spin Single", 2, true],       // attackFunc(combo_level, 2, B2B_level)
    "tsmd": ["T-Spin Mini Double", 1, true], // attackFunc(combo_level, 1, B2B_level)
    "tsd": ["T-Spin Double", 4, true],       // attackFunc(combo_level, 4, B2B_level)
    "tst": ["T-Spin Triple", 6, true]        // attackFunc(combo_level, 6, B2B_level)

};


function attackFunc(combo_level, base_attack, B2B_level) {

    if (B2B_level + base_attack == 0) {

        return Math.floor(Math.log1p(combo_level * 1.25));

    } else {

        return Math.floor(combo_level/(4/(B2B_level + base_attack))) + B2B_level + base_attack;

    }

}


function updateFoot() {

    document.getElementById("AttackFoot").innerHTML = ("<tr> <td></td>"+
    "<td> <b> <i>Total:</i></b> </td>" +
    "<td> <b> <i>" + total_lines + "</i> </b> </td> </tr>");
    
}


function updateTable(){

    attackHTML = "";

    total_lines = 0;
    
    for (var attack of attack_list) {

        attackHTML += (`<tr id=${attack["id"]}>`+
        "<td>" +                 attack["num"] +        // #
        "</td> <td>" +           attack["name"] +       // Attack type
        "</td> <td> <b>" +      (attack["lines_sent"] + Number(attack["PC"])*10) + // Lines Sent
        "</b> </td> <td>" +      attack["combo"] +      // Combo
        "</td> <td>" +           attack["B2B_count"] +  // B2B Count
        "</td> <td>" +           attack["B2B_level"] +  // B2B Level

        "</td> <td>" + `<input type="checkbox" id="PC${attack["num"]}" name="PC${attack["num"]}" onclick="PerfectClear(${attack["num"]})"`);

        if (attack["PC"] == true) {
            attackHTML += "checked>";
        } else {
            attackHTML += ">";
        }

        attackHTML += "</td>" + "</tr>";
        
        total_lines += attack["lines_sent"] + Number(attack["PC"])*10;

    }

    console.log(attack)

    document.getElementById("AttackList").innerHTML = attackHTML;

    updateFoot();

}


function PerfectClear(pc_num) {

    console.log(document.getElementById(`PC${pc_num}`).checked);

    if (document.getElementById(`PC${pc_num}`).checked == true) {

        attack_list[pc_num - 1]["PC"] = true;

    } else {

        attack_list[pc_num - 1]["PC"] = false;

    }

    updateTable();

}


document.getElementById("button_add").onclick = function() {
    
    attack_selected = document.getElementById("attack_selected").value;

    attack_count++;

    if (comboing) {

        combo_level++;

    } else {

        combo_level = 0;

    }

    if (attack_dict[attack_selected][2] === true && B2Bing) {

        B2B_count++;

        if (B2B_count <= 0) {
            B2B_level = 0;
        } else if (B2B_count <= 2) {
            B2B_level = 1;
        } else if (B2B_count <= 7) {
            B2B_level = 2;
        } else if (B2B_count <= 23) {
            B2B_level = 3;
        } else if (B2B_count <= 66) {
            B2B_level = 4;
        } else if (B2B_count <= 184) {
            B2B_level = 5;
        } else if (B2B_count <= 503) {
            B2B_level = 6;
        } else if (B2B_count <= 1369) {
            B2B_level = 7;
        } else {
            B2B_level = 8;
        }

    } else {

        if (attack_dict[attack_selected][2]) {
            B2B_count = 0;
        } else {
            B2B_count = -1;            
        }

        B2B_level = 0;

    }

    attack_list.push({
        
        "id":`attack${attack_count}`,
        "num": attack_count,
        "attack_id": attack_selected,
        "name": attack_dict[attack_selected][0],
        "combo": combo_level,
        "B2B_count": B2B_count,
        "B2B_level": B2B_level,
        "lines_sent": attackFunc(combo_level, attack_dict[attack_selected][1], B2B_level),
        "PC": false
    
    });

    console.log(attack_selected);
    console.log(attack_list);

    updateTable()

    // attackHTML += (`<tr id=${attack_list[attack_count - 1]["id"]}>`+
    //               "<td>" + attack_list[attack_count - 1]["num"] +
    //               "</td> <td>" + attack_list[attack_count - 1]["name"] +
    //               "</td> <td> <b>" + attack_list[attack_count - 1]["lines_sent"] +
    //               "</b> </td> <td>" + attack_list[attack_count - 1]["combo"] +
    //               "</td> <td>" + attack_list[attack_count - 1]["B2B_count"] +
    //               "</td> <td>" + attack_list[attack_count - 1]["B2B_level"] +
    //               "</td>" + 
    //               "</tr>");

    // // console.log(attackHTML);

    // total_lines += attack_list[attack_count - 1]["lines_sent"];

    // document.getElementById("AttackList").innerHTML = attackHTML;

    // updateFoot();

}


document.getElementById("toggle_combo").onclick = function() {

    if (comboing) {

        comboing = false;
        combo_level = 0;

        document.getElementById("toggle_combo").innerHTML = "Comboing <b> Off </b>";

    } else {

        comboing = true;

        document.getElementById("toggle_combo").innerHTML = "Comboing <b> On </b>"

    }

}


document.getElementById("toggle_B2B").onclick = function() {

    if (B2Bing) {

        B2Bing = false;
        B2B_count = -1;
        B2B_level = 0;

        document.getElementById("toggle_B2B").innerHTML = "B2B <b> Off </b>"

    } else {

        B2Bing = true;

        document.getElementById("toggle_B2B").innerHTML = "B2B <b> On </b>"

    }

}


document.getElementById("button_clear").onclick = function() {

    attack_list = [];

    combo_level = -1;

    B2B_count = -1;

    B2B_level = 0;

    attack_count = 0;

    updateTable();

    // total_lines = 0;

    // attackHTML = "";

    // document.getElementById("AttackList").innerHTML = attackHTML;

    // updateFoot();
}


document.getElementById("button_image").onclick = function() {

    var chart = document.getElementById("chart");

    if (chart.style.display === "none") {

      chart.style.display = "block";

    } else {

      chart.style.display = "none";

    }
     
}