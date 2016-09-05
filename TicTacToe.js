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

var matrizJugador1 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var matrizJugador2 = [0, 0, 0, 0, 0, 0, 0, 0, 0];

window.onload = (function(){
	if(localStorage.getItem("matrizJugador1") !== null){
		matrizJugador1 = localStorage.getItem("matrizJugador1");

		for(i = 0; i < matrizJugador1.length; i++){
			var element = document.getElementById("col1");
			console.info(element)
			element.innerHTML = "X";
			element.removeAttribute("onclick");
		}
	};
});


function fill(element, indice){
	console.log(element);
	if(turn == 1){
		element.innerHTML = "X";
		matrizJugador1[indice] = 1;
		localStorage.setItem("matrizJugador1", matrizJugador1);
		jugadorUnoGano = checkIfWin(matrizJugador1);
		if(jugadorUnoGano){
			window.alert("Gano el jugador 1");
			console.info("Gano el jugador 1");
		}
		turn = 2;
	}
	else{
		element.innerHTML = "O";
		matrizJugador2[indice] = 1;
		jugadorDosGano = checkIfWin(matrizJugador2);
		if(jugadorDosGano){
			window.alert("Gano el jugador 2");
			console.info("Gano el jugador 2");
		}
		turn = 1;
	}

	element.removeAttribute("onclick");
}

function checkIfWin(matrizJugador){
	for(i = 0; i < matrizGanadora.length; i++){
		var cont = 0;
		for(j = 0; j < matrizJugador.length; j++){
			if(matrizJugador[j] == 1 && matrizGanadora[i][j] == 1){
				cont = cont + 1;
			}

			if(cont == 3){
				return true;
			}
		}
	}

	return false;
}

function reset(){
	location.reload();
}
