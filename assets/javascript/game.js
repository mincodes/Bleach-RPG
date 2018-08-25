

var gameOn = false;
var chooseDefender = false;
var userDeath = false;
var computerDeath = false;
var victim;
var assailant;
var winner;
var deadSoulRipper = [];
var IchigoKurosaki = {
	hp: 100,
	attackPower: 6
}
var RukiaKuchiki = {
	hp: 120,
	attackPower: 6
}
var ByakuyaKuchiki = {
	hp: 180,
	attackPower: 6
}
var SosukeAizen = {
	hp: 150,
	attackPower: 6
}

$(".character").on("click", function() {
	if (!(gameOn) && !(chooseDefender)) {
		chooseDefender = true; 
		$(this).css("border-color", "#320B68");
		$("#choose").html("Enemy"); 
		assailant = $(this).detach(); 
		assailant.appendTo("#active"); 
		console.log(assailant);
		$("#battle").fadeIn("slow");
	} else if (chooseDefender) { 
		chooseDefender = false;
		gameOn = true; 
		$("#alerts").html(""); 
		$(this).css("border-color", "#B9161A");
		victim = $(this).detach(); 
		victim.appendTo("#under-attack"); 
		console.log(victim);
		$("#available").fadeOut("slow"); 
		$("#fight").fadeIn("slow"); 
	} 
})

function reset() {
	
	if (userDeath) {
		winner = victim.detach();
	}
	gameOn = false;
	chooseDefender = false;
	userDeath = false;
	computerDeath = false;
	
	for (let x = 0; x < deadSoulRipper.length; x++) {
		deadSoulRipper[x].appendTo("#available");
	}
	
	deadSoulRipper = [];
	winner.appendTo("#available"); 
	
	$("#alerts").html("");
	$("#choose").html("Character");
	$(".character").css("border-color", "#7D9403");
	$("#reset").fadeOut("slow");
	$("#battle").fadeOut("slow");
	
	$("#IchigoKurosaki").data("hp", IchigoKurosaki.hp).find(".soulripper-HP").html(IchigoKurosaki.hp);
	$("#IchigoKurosaki").data("attack-power", IchigoKurosaki.attackPower);

	$("#RukiaKuchiki").data("hp", RukiaKuchiki.hp).find(".soulripper-HP").html(RukiaKuchiki.hp);;
	$("#RukiaKuchiki").data("attack-power", RukiaKuchiki.attackPower);

	$("#ByakuyaKuchiki").data("hp", ByakuyaKuchiki.hp).find(".soulripper-HP").html(ByakuyaKuchiki.hp);;
	$("#ByakuyaKuchiki").data("attack-power", ByakuyaKuchiki.attackPower);

	$("#SosukeAizen").data("hp", SosukeAizen.hp).find(".soulripper-HP").html(SosukeAizen.hp);;
	$("#SosukeAizen").data("attack-power", SosukeAizen.attackPower);

	
	$("#available").fadeIn("slow");
}

var transition;
function checkForWin () {
	
	if (deadSoulRipper.length === 3) {
		function youWin() {
			$("#alerts").text(" YOU WIN!!!");
			$("#fight").fadeOut("fast"); 
			$("#battle").fadeOut("fast"); 
			$("#reset").fadeIn("slow"); 
			gameOn = false;
			
			winner = assailant.detach();
		}
		transition = setTimeout(youWin, 2000);
	} else { 
		$("#fight").fadeOut("slow"); 
		$("#available").fadeIn("slow"); 
		chooseDefender = true;
	}
}


function battle() {
	var vhp = parseInt(victim.data("hp")); 
	var attack = parseInt(assailant.data("attack-power")); 
	vhp-= attack; 
	victim.data("hp", vhp); 
	$("#under-attack").find(".soulripper-HP").html(vhp); 
	$("#alerts").html("You did " + attack + " damage to " + victim.data("name") +". ");
	attack+=attack; 
	assailant.data("attack-power", attack); 
	
	if (vhp <= 0) {
		function jediDied() {
			deadSoulRipper.push(victim.detach());
			console.log(deadSoulRipper);
			$("#alerts").text(" And you killed him!");
			
			checkForWin();
		}
		transition = setTimeout(jediDied, 2000);
	} else {
		
		var uhp = parseInt(assailant.data("hp")); 
		var counterAttack = parseInt(victim.data("counter-attack")); 
		uhp -= counterAttack; 
		assailant.data("hp", uhp); 
		$("#active").find(".soulripper-HP").html(uhp); 
		$("#alerts").append(victim.data("name") + " did " + counterAttack + " damage to you.");
		
		if (uhp <= 0) {
			$("#alerts").text(" And he killed you!");
			function youDied() {
				userDeath = true;
				
				deadSoulRipper.push(assailant.detach());
				console.log(deadSoulRipper);
				
				$("#fight").fadeOut("fast"); 
				$("#battle").fadeOut("fast"); 
				$("#reset").fadeIn("slow"); 
			}
			transition = setTimeout(youDied, 2000);
		}
	}
}


$("button").on("click", function() {
	if (userDeath || !(gameOn)) {
		reset();
	} else {
		battle();
	}
})
