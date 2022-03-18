var attack_selected;
var attack_list = [];

var comboing = true;
document.getElementById("toggle_combo").innerHTML = "Comboing <b> On </b>";
var B2Bing = true
document.getElementById("toggle_B2B").innerHTML = "B2B <b> On </b>";

var combo_level = -1;
var B2B_count = -1;
var attack_count = 0;
var total_lines = 0;

var attackHTML = "";
document.getElementById("AttackList").innerHTML = attackHTML;

const ATTACK_DICT = { // base settings for each attack type

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


function attackFunc(combo_level, base_attack, B2B_level) { // returns the number of lines sent

	if (B2B_level + base_attack == 0) {

		return Math.floor(Math.log1p(combo_level * 1.25));

	} else {

		return Math.floor(combo_level/(4/(B2B_level + base_attack))) + B2B_level + base_attack;

	}

}


function b2bCountToLevel(B2B_count) { // converts b2b count to level

	if (B2B_count <= 0) {
		return 0;
	} else if (B2B_count <= 2) {
		return 1;
	} else if (B2B_count <= 7) {
		return 2;
	} else if (B2B_count <= 23) {
		return 3;
	} else if (B2B_count <= 66) {
		return 4;
	} else if (B2B_count <= 184) {
		return 5;
	} else if (B2B_count <= 503) {
		return 6;
	} else if (B2B_count <= 1369) {
		return 7;
	} else {
		return 8;
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
		"</td> <td>" +           ATTACK_DICT[attack["attack_id"]][0] + // Attack type
		"</td> <td> <b>" +      (attack["lines_sent"] + Number(attack["PC"])*10) + // Lines Sent
		"</b> </td> <td>" +      attack["combo"] +      // Combo
		"</td> <td>" +           attack["B2B_count"] +  // B2B Count
		"</td> <td>" +           b2bCountToLevel(attack["B2B_count"]) +  // B2B Level
		"</td>");

		if (attack["attack_id"].startsWith('ts')) { // t-spins cant be pcs

			attackHTML += "</tr>";

		} else {

			attackHTML += ("<td>" +
			`<input type="checkbox" id="PC${attack["num"]}" name="PC${attack["num"]}" onclick="perfectClear(${attack["num"]})"`);            

			if (attack["PC"]) {
				attackHTML += "checked>";
			} else {
				attackHTML += ">";
			}

			attackHTML += "</td>" + "</tr>";

		}

		total_lines += attack["lines_sent"] + Number(attack["PC"])*10;

	}

	console.log(attack)

	document.getElementById("AttackList").innerHTML = attackHTML;

	updateFoot();

	// document.getElementById("export").innerText = btoa(JSON.stringify(attack_list))

	// document.getElementById("export_json").innerText = JSON.stringify(attack_list)


}


function perfectClear(pc_num) {

	console.log(document.getElementById(`PC${pc_num}`).checked);

	if (document.getElementById(`PC${pc_num}`).checked) {

		attack_list[pc_num - 1]["PC"] = true;

	} else {

		attack_list[pc_num - 1]["PC"] = false;

	}

	updateTable();

}


function buttonAdd() {
	
	attack_selected = document.getElementById("attack_selected").value;

	attack_count++;

	if (comboing) {

		combo_level++;

	} else {

		combo_level = 0;

	}

	if (ATTACK_DICT[attack_selected][2] && B2Bing) { // if attack is B2B-able and B2B is turned on

		B2B_count++;

	} else if (ATTACK_DICT[attack_selected][2]) { // if attack is B2B-able and B2B is turned off

		B2B_count = 0;

	} else { // attack is not B2B-able

		B2B_count = -1;

	}
	

	attack_list.push({
		
		"id":`attack${attack_count}`,
		"num": attack_count,
		"attack_id": attack_selected,
		"combo": combo_level,
		"B2B_count": B2B_count,
		"lines_sent": attackFunc(combo_level, ATTACK_DICT[attack_selected][1], b2bCountToLevel(B2B_count)),
		"PC": false
	
	});

	console.log(attack_selected);
	console.log(attack_list);

	updateTable()

}


function toggleCombo() {

	if (comboing) {

		comboing = false;
		combo_level = 0;

		document.getElementById("toggle_combo").innerHTML = "Comboing <b> Off </b>";

	} else {

		comboing = true;

		document.getElementById("toggle_combo").innerHTML = "Comboing <b> On </b>"

	}

}


function toggleB2B() {

	if (B2Bing) {

		B2Bing = false;
		B2B_count = -1;

		document.getElementById("toggle_B2B").innerHTML = "B2B <b> Off </b>"

	} else {

		B2Bing = true;

		document.getElementById("toggle_B2B").innerHTML = "B2B <b> On </b>"

	}

}


function buttonClear() {

	attack_list = [];

	combo_level = -1;

	B2B_count = -1;

	attack_count = 0;

	updateTable();

}

function buttonShortcuts() {

	const keyboardShortcuts = document.getElementById("keyboardShortcuts");

	if (keyboardShortcuts.style.display === "none") {

		keyboardShortcuts.style.display = "table";

	} else {

		keyboardShortcuts.style.display = "none";

	}
	 
}

document.addEventListener('keydown', function(event) {

	// Keyboard shortcuts

	if(event.defaultPrevented) {
		return;
	}

	switch (event.key) {

		case "K": case "k":
			buttonShortcuts();
			return;	
		case "9":
			toggleCombo();
			return;
		case "0":
			toggleB2B();
			return;
		case "P": case "p":
			const ATTACKNUM = Object.keys(attack_list).length;
			if (document.getElementById(`PC${ATTACKNUM}`).checked) {
				attack_list[ATTACKNUM - 1]["PC"] = false;
			} else {
				attack_list[ATTACKNUM- 1]["PC"] = true;
			}
			updateTable();
			return;
		case "Backspace":
			buttonClear();
			return;
		case "Enter":
			buttonAdd();
			return;
		default:
			return;
	}

});





// document.getElementById("button_image").onclick = function() {

// 	const chart = document.getElementById("chart");

// 	if (chart.style.display === "none") {

// 	  chart.style.display = "block";

// 	} else {

// 	  chart.style.display = "none";

// 	}
	 
// }

// document.getElementById("button_export").onclick = function() {

//     const export_string = document.getElementById("export");

//     if (export_string.style.display === "none") {

//       export_string.style.display = "block";

//     } else {

//       export_string.style.display = "none";

//     }
	 
// }