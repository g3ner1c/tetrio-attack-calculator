var selected;

var attack_dict = {

    // "attackid": ["Name", Base Attack Count, B2B-able Flag]

    "single": ["Single", 0, false],
    "double": ["Double", 1, false],
    "triple": ["Triple", 2, false],
    "quad": ["Quad", 4, true],
    "tsms": ["T-Spin Mini Single", 0, true],
    "tss": ["T-Spin Single", 2, true],
    "tsmd": ["T-Spin Mini Double", 1, true],
    "tsd": ["T-Spin Double", 4, true],
    "tst": ["T-Spin Triple", 6, true]

};

var attack_list = [];

document.getElementById("button_add").onclick = function() {
    
    selected = document.getElementById("attack").value;
    attack_list.push(selected);

    console.log(selected);
    console.log(attack_list);

    // document.getElementById("selected").innerHTML = attack_dict[selected];

    var attackHTML = "<tr> <th>#</th> <th>Attack Type</th> <th>Lines Sent</th> </tr>";

    var attack_count = 0;

    var total_lines = 0;

    for (var attack of attack_list) {

        attack_count++;

        total_lines += attack_dict[attack][1];

        attackHTML += "<tr> <td>" + attack_count + "</td> <td>" + attack_dict[attack][0] + "</td> <td>" + attack_dict[attack][1] + "</td> </tr>";

    }

    attackHTML += "<tr> <td></td> <td> <b>Total:</b> </td> <td> <b>" + total_lines + "</b> </td> </tr>";

    document.getElementById("AttackList").innerHTML = attackHTML;

}


document.getElementById("button_clear").onclick = function() {

    attack_list = [];

    document.getElementById("AttackList").innerHTML = ""

}


document.getElementById("button_image").onclick = function() {

    var chart = document.getElementById("chart");

    if (chart.style.display === "none") {

      chart.style.display = "block";

    }

    else {
      chart.style.display = "none";
    }
     
}