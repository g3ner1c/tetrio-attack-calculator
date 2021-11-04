var attack;
var attack_list = [];

var comboing = true;
document.getElementById("toggle_combo").innerText = "Comboing On"
var B2Bing = true
document.getElementById("toggle_B2B").innerText = "B2B On"

var combo_level = -1;
var B2B_count = -1;
var B2B_level = 0;
var attack_count = 0;
var total_lines = 0;

var attackHTML = "<tr> <th>#</th> <th>Attack Type</th> <th>Lines Sent</th> <th>Combo</th> <th>B2B Count</th> <th>B2B Level</th> </tr>";
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


document.getElementById("button_add").onclick = function() {
    
    attack = document.getElementById("attack").value;

    attack_count++;

    if (comboing) {

        combo_level++;

    } else {

        combo_level = 0;

    }

    if (attack_dict[attack][2] === true && B2Bing) {

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

        if (attack_dict[attack][2]) {
            B2B_count = 0;
        } else {
            B2B_count = -1;            
        }

        B2B_level = 0;

    }

    attack_list.push({
        
        "num": attack_count,
        "id": attack,
        "name": attack_dict[attack][0],
        "combo": combo_level,
        "B2B_count": B2B_count,
        "B2B_level": B2B_level,
        "lines_sent": attackFunc(combo_level, attack_dict[attack][1], B2B_level)
    
    });

    console.log(attack);
    console.log(attack_list);

    if (attack_list.length === 1) {
        
        attackHTML = "<tr> <th>#</th> <th>Attack Type</th> <th>Lines Sent</th> <th>Combo</th> <th>B2B Count</th> <th>B2B Level</th> </tr>";

    }

    attackHTML += ("<tr> <td>" + attack_list[attack_count - 1]["num"] +
                  "</td> <td>" + attack_list[attack_count - 1]["name"] +
                  "</td> <td>" + attack_list[attack_count - 1]["lines_sent"] +
                  "</td> <td>" + attack_list[attack_count - 1]["combo"] +
                  "</td> <td>" + attack_list[attack_count - 1]["B2B_count"] +
                  "</td> <td>" + attack_list[attack_count - 1]["B2B_level"] +
                  "</td> </tr>");

    // console.log(attackHTML);

    total_lines += attack_list[attack_count - 1]["lines_sent"];

    document.getElementById("AttackList").innerHTML = attackHTML + "<tr> <td></td> <td> <b>Total:</b> </td> <td> <b>" + total_lines + "</b> </td> </tr>";

}


document.getElementById("toggle_combo").onclick = function() {

    if (comboing) {

        comboing = false;
        combo_level = 0;

        document.getElementById("toggle_combo").innerText = "Comboing Off"

    } else {

        comboing = true;

        document.getElementById("toggle_combo").innerText = "Comboing On"

    }

}


document.getElementById("toggle_B2B").onclick = function() {

    if (B2Bing) {

        B2Bing = false;
        B2B_count = -1;
        B2B_level = 0;

        document.getElementById("toggle_B2B").innerText = "B2B Off"

    } else {

        B2Bing = true;

        document.getElementById("toggle_B2B").innerText = "B2B On"

    }

}


document.getElementById("button_clear").onclick = function() {

    attack_list = [];

    combo_level = -1;

    B2B_count = -1;

    B2B_level = 0;

    attack_count = 0;

    total_lines = 0;

    attackHTML = "<tr> <th>#</th> <th>Attack Type</th> <th>Lines Sent</th> </tr>";

    document.getElementById("AttackList").innerHTML = attackHTML;

}


document.getElementById("button_image").onclick = function() {

    var chart = document.getElementById("chart");

    if (chart.style.display === "none") {

      chart.style.display = "block";

    } else {

      chart.style.display = "none";

    }
     
}