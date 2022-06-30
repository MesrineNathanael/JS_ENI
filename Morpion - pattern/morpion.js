function Initialisation() {
	//On cache le bouton "Rejouer"
	document.getElementById("rejouer").style.visibility = "hidden";
	//On définit les joueurs
	joueurs = ['X', 'O'];
	//Et le joueur qui commence
	joueur = joueurs[0];
	
	board = [["a1","a2","a3"],["b1","b2","b3"],["c1","c2","c3"]];
	currentBoard = [["","",""],["","",""],["","",""]];

	document.getElementById("turn").innerText = "Tour de " + joueur;
}

function jouer(zone) {
	const elementWeb = document.getElementById(zone);
	if(elementWeb.value) return;

	var img = document.createElement("img");
	
	for (let l = 0; l < board.length; l++) {
		const index = board[l].indexOf(zone);

		if(index != -1){
			if(joueur == 'X'){
				currentBoard[l][index] = -1;
			}else{
				currentBoard[l][index] = 1;
			}
		}
	}

	switch(joueur){
		case 'X':
			img.src = "./image-morpion/croix.png";
			elementWeb.value = joueur;
			joueur = joueurs[1];
			break;
		case 'O':
			img.src = "./image-morpion/rond.png";
			elementWeb.value = joueur;
			joueur = joueurs[0];
			break;
	}

	//console.log(currentBoard);
	elementWeb.appendChild(img);
	check();
	document.getElementById("turn").innerText = "Tour de " + joueur;
}

function check(){
	var win = ""; 
    for(var i = 0; i<3;i++){
        var rowSum = 0;
        for(var j = 0; j<3;j++){
            rowSum += currentBoard[i][j];
        }
        if(rowSum === 3)
			win ="Circle WIN!";
        else if(rowSum === -3)
            win = "Cross WIN!";
    }

    for(var i = 0; i<3;i++){
        var colSum = 0;
        for(var j = 0; j<3;j++){
            colSum += currentBoard[j][i];
        }
        if(colSum === 3)
			win ="Circle WIN!";
        else if(colSum === -3)
			win ="Cross WIN!";
    }

    if(currentBoard[0][0] + currentBoard[1][1] + currentBoard[2][2] === 3)
		win ="Circle WIN!";
    else if(currentBoard[0][0] + currentBoard[1][1] + currentBoard[2][2] === -3)
		win ="Cross WIN!";

    if(currentBoard[2][0] + currentBoard[1][1] + currentBoard[0][2] === 3)
		win ="Circle WIN!";
    else if(currentBoard[2][0] + currentBoard[1][1] + currentBoard[0][2] === -3)
		win ="Cross WIN!";

	if(win){
		setTimeout(function() { alert(win + " gg bebou"); }, 1);
		document.getElementById("rejouer").style.visibility = "visible";
		return;
	}

	var count = 0;
	for (let l = 0; l < currentBoard.length; l++) {
		const element = currentBoard[l];
		for (let c = 0; c < element.length; c++) {
			const e = element[c];
			if(e){
				count ++;
			}
		}
	}
	if(count >= 9){
		setTimeout(function() { alert("its a draw"); }, 1);
		document.getElementById("rejouer").style.visibility = "visible";
	}
}
