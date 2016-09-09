"use strict";

var turn = 1;

var matrizGanadora = [[1, 1, 1,
					0, 0, 0,
					0, 0, 0],

					[1, 0, 0,
					1, 0, 0,
					1, 0, 0],

					[1, 0, 0,
					0, 1, 0,
					0, 0, 1],

					[0, 1, 0,
					0, 1, 0,
					0, 1, 0],

					[0, 0, 1,
					0, 0, 1,
					0, 0, 1],

					[0, 0, 1,
					0, 1, 0,
					1, 0, 0],

					[0, 0, 0,
					1, 1, 1,
					0, 0, 0],

					[0, 0, 0,
					0, 0, 0,
					1, 1, 1]];

var matrizGanadoraColorear = [];

function Jugador(name, color, matrizJugador, juegosGanados){
	this.name = name;
	this.color = color;
	this.matrizJugador = matrizJugador;
	this.juegosGanados = juegosGanados;
}

var jugador1 = {};
var jugador2 = {};

window.onload = (function(){
	if(localStorage.getItem("nameJugador1") !== null){
		jugador1 = new Jugador(localStorage.getItem("nameJugador1"), localStorage.getItem("colorJugador1"), JSON.parse(localStorage.getItem("matrizJugador1")), JSON.parse(localStorage.getItem("juegosGanados1")));
		document.getElementById("jugador1").innerHTML = jugador1.name.fontcolor(jugador1.color);
		fillWithLocalStorage(jugador1.matrizJugador, 1, jugador1.juegosGanados);
	}
	else{
		jugador1 = new Jugador(prompt("Jugador 1\nIntroduzca su nombre:"), prompt("Jugador 1\nIntroduzca un color:"), [0, 0, 0, 0, 0, 0, 0, 0, 0], 0);
		document.getElementById("jugador1").innerHTML = jugador1.name.fontcolor(jugador1.color);
		document.getElementById("ganados1").innerHTML = jugador1.juegosGanados;
		localStorage.setItem("nameJugador1", jugador1.name);
		localStorage.setItem("colorJugador1", jugador1.color);
	};

	if(localStorage.getItem("nameJugador2") !== null){
		jugador2 = new Jugador(localStorage.getItem("nameJugador2"), localStorage.getItem("colorJugador2"), JSON.parse(localStorage.getItem("matrizJugador2")), JSON.parse(localStorage.getItem("juegosGanados2")));
		document.getElementById("jugador2").innerHTML = jugador2.name.fontcolor(jugador2.color);
		fillWithLocalStorage(jugador2.matrizJugador, 2, jugador2.juegosGanados);
	}
	else{
		jugador2 = new Jugador(prompt("Jugador 2\nIntroduzca su nombre:"), prompt("Jugador 2\nIntroduzca un color:"), [0, 0, 0, 0, 0, 0, 0, 0, 0], 0);
		document.getElementById("jugador2").innerHTML = jugador2.name.fontcolor(jugador2.color);
		document.getElementById("ganados2").innerHTML = jugador2.juegosGanados;
		localStorage.setItem("nameJugador2", jugador2.name);
		localStorage.setItem("colorJugador2", jugador2.color);
	};

	if(localStorage.getItem("turn") !== null){
		turn = localStorage.getItem("turn");
	};
});

function fillWithLocalStorage(matrizJugador, jugador, juegosGanados){
	for(var i = 0; i < matrizJugador.length; i++){
		//console.info(matrizJugador);
		if(matrizJugador[i] == 1){
			var num = (i+1).toString();
			var element = document.getElementById("row"+num);
			if(jugador == 1){
				element.innerHTML = "X".fontcolor(jugador1.color);
			}
			else if(jugador == 2){
				element.innerHTML = "O".fontcolor(jugador2.color);
			}
			element.removeAttribute("onclick");
		}
	}

	if(jugador == 1){
		document.getElementById("ganados1").innerHTML = juegosGanados;
	}
	else if(jugador == 2){
		document.getElementById("ganados2").innerHTML = juegosGanados;
	}
}

function fill(element, indice){
	if(turn == 1){
		element.innerHTML = "X".fontcolor(jugador1.color);
		jugador1.matrizJugador[indice] = 1;
		localStorage.setItem("matrizJugador1", JSON.stringify(jugador1.matrizJugador));
		var jugadorUnoGano = checkIfWin(jugador1.matrizJugador);
		if(jugadorUnoGano){
			colorearGanador(turn);
			jugador1.juegosGanados += 1;
			document.getElementById("ganados1").innerHTML = jugador1.juegosGanados;
			localStorage.setItem("juegosGanados1", JSON.stringify(jugador1.juegosGanados));
			window.alert("Gano " + jugador1.name);
			console.info("Gano el jugador 1");
			removeOnClick()
		}
		turn = 2;
	}
	else{
		element.innerHTML = "O".fontcolor(jugador2.color);
		jugador2.matrizJugador[indice] = 1;
		localStorage.setItem("matrizJugador2", JSON.stringify(jugador2.matrizJugador));
		var jugadorDosGano = checkIfWin(jugador2.matrizJugador);
		if(jugadorDosGano){
			colorearGanador(turn);
			jugador2.juegosGanados += 1;
			document.getElementById("ganados2").innerHTML = jugador2.juegosGanados;
			localStorage.setItem("juegosGanados2", JSON.stringify(jugador2.juegosGanados));
			window.alert("Gano " + jugador2.name);
			console.info("Gano el jugador 2");
			removeOnClick()
		}
		turn = 1;
	}

	localStorage.setItem("turn", turn);
	element.removeAttribute("onclick");
}

function removeOnClick(){
	for(var i = 0; i < 9; i++){
		var num = (i+1).toString();
		var element = document.getElementById("row"+num);
		if(element.hasAttribute("onclick")){
			element.removeAttribute("onclick");
		}
	}
}

function checkIfWin(matrizJugador){
	for(var i = 0; i < matrizGanadora.length; i++){
		var cont = 0;
		for(var j = 0; j < matrizJugador.length; j++){
			if(matrizJugador[j] == 1 && matrizGanadora[i][j] == 1){
				cont += 1;
			}

			if(cont == 3){
				matrizGanadoraColorear = matrizGanadora[i];
				return true;
			}
		}
	}

	return false;
}

function colorearGanador(jugador){
	for(var i = 0; i < matrizGanadoraColorear.length; i++){
		if(matrizGanadoraColorear[i] == 1){
			var num = (i+1).toString();
			var element = document.getElementById("row"+num);
			if(jugador == 1){
				element.style.borderColor = jugador1.color;
			}
			else if (jugador == 2){
				element.style.borderColor = jugador2.color;
			}
			
		}
	}
}

function reset(){
	localStorage.clear();
	location.reload();
}

function limpiarTablero(){
	localStorage.setItem("matrizJugador1", JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0]));
	localStorage.setItem("matrizJugador2", JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0]));
	localStorage.setItem("turn", 1);
	location.reload();
}
