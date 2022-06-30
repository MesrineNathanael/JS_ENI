//mahjong game 

//image of the tiles are in ./classic/ folder
//image are named from 0 to 41

var selectedTiles = [[],[]];
var tiles = [];
//gernerate 32 mahjong tiles in the document with random image
function generateTiles() {
    const cont = document.getElementById('container');
    tiles = [];
    tilesValue = [];
    var count = 0;
    for (let l = 0; l < 4; l++) {
        var line = [];
        var lineValue = [];
        for (let c = 0; c < 8; c++) {
            var tile = document.createElement("div");
            tile.className = "tile";
            //strecth the image to fit the tile
            tile.style.backgroundSize = "100% 100%";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
            //event on click
            tile.onclick = tilesOnClick;
            //random number between 0 and 41
            var random = Math.floor(Math.random() * 42);
            tile.id = count;
            tile.value = random;
            tile.style.backgroundImage = "url('./classic/" + random + ".jpg')";
            cont.appendChild(tile);
            line.push(count);
            lineValue.push(random);
            count++;
        }
        tiles.push(line);
        tilesValue.push(lineValue);
    }

    //check if the tilesValue as at least one pair in each column
    for(let i = 0; i < tilesValue.length; i++){
        var pair = false;
        for(let j = 0; j < tilesValue[i].length; j++){
            for(let k = j+1; k < tilesValue[i].length; k++){
                if(tilesValue[i][j] == tilesValue[i][k]){
                    pair = true;
                    break;
                }
            }
        }
        if(!pair){
            //regenerate the tiles
            cont.innerHTML = "";
            generateTiles();
            return;
        }
    }
    
    //for each tile in the tiles array
    for(let i = 0; i < tiles.length; i++){
        //for each tile in the line
        for(let j = 0; j < tiles[i].length; j++){ 
            //if the tile is the first or the last
            if(isFirstOrLast(tiles[i][j], tiles)){
                //get the tile
                var tile = document.getElementById(tiles[i][j]);
                //add the class movable to the tile
                tile.classList.add("movable");
            }
        }
    }
}

function tilesOnClick(event){
    console.log(event.target.id);
    console.log(tiles);
    if(!isFirstOrLast(event.target.id, tiles)){
        return;
    }
    if(selectedTiles[0].length == 0){
        //get the document of the selectedTiles and add the class selected
        selectedTiles[0][0] = event.target.id;
        selectedTiles[0][1] = event.target.value;
    }
    else if(selectedTiles[1].length == 0){
        selectedTiles[1][0] = event.target.id;
        selectedTiles[1][1] = event.target.value;
    }
    else{
        selectedTiles[0][0] = selectedTiles[1][0];
        selectedTiles[0][1] = selectedTiles[1][1];
        selectedTiles[1][0] = event.target.id;
        selectedTiles[1][1] = event.target.value;
    }
    //check if the two tiles are the same
    if(selectedTiles[0][1] == selectedTiles[1][1]){
        //remove the tiles
        document.getElementById(selectedTiles[0][0]).classList.remove("movable");
        document.getElementById(selectedTiles[1][0]).classList.remove("movable");
        document.getElementById(selectedTiles[0][0]).classList.remove("selected");
        document.getElementById(selectedTiles[1][0]).classList.remove("selected");
        document.getElementById(selectedTiles[0][0]).classList.add("hide");
        document.getElementById(selectedTiles[1][0]).classList.add("hide");
        //remove the tiles from the tiles array
        removeTile(selectedTiles[0][0]);
        removeTile(selectedTiles[1][0]);
        //reset the selected tiles
        selectedTiles = [[],[]];
        addRemoveMovable();
    }

    //add the class selected to the selected tiles
    document.getElementById(selectedTiles[0][0]).classList.add("selected");
    document.getElementById(selectedTiles[1][0]).classList.add("selected");

    //for each tile in the tiles array
    for(let i = 0; i < tiles.length; i++){
        for(let j = 0; j < tiles[i].length; j++){
            //if the tile is selected
            if(document.getElementById(tiles[i][j]).classList.contains("selected") && tiles[i][j] != selectedTiles[0][0] && tiles[i][j] != selectedTiles[1][0]){
                document.getElementById(tiles[i][j]).classList.remove("selected");
            }
        }
    }

    addRemoveMovable();
}

//call addremovemovable function each seconds
//setInterval(addRemoveMovable, 5000);

//function to add and remove the class movable to the tiles
function addRemoveMovable(){
    //for each tile in the tiles array
    for(let i = 0; i < tiles.length; i++){
        for(let j = 0; j < tiles[i].length; j++){
            //if the tile is the first or the last
                if(j == 0 || j == tiles[i].length - 1){
                    console.log(tiles[i][j] + " is first or last");
                    //get the tile
                    var tile = document.getElementById(tiles[i][j]);
                    //add the class movable to the tile
                    tile.classList.add("movable");
                }else{
                    //remove the class movable to the tile
                    document.getElementById(tiles[i][j]).classList.remove("movable");
                }
            
        }
    }
}


//function to check if the id is the first or the last of one array in tiles
function isFirstOrLast(id, array){
    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array[i].length; j++){
            if(array[i][j] == id){
                if(j == 0 || j == array[i].length - 1){
                    return true;
                }
            }
        }
    }
    return false;
}

//function to remove a tile in the tiles array by its id
function removeTile(id){
    for(let i = 0; i < tiles.length; i++){
        for(let j = 0; j < tiles[i].length; j++){
            if(tiles[i][j] == id){
                tiles[i].splice(j,1);
            }
        }
    }
}

//generate the mahjong tiles in the document
generateTiles();