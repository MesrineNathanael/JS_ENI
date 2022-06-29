//mahjong game 

//image of the tiles are in ./classic/ folder
//image are named from 0 to 41

//gernerate 32 mahjong tiles in the document with random image
function generateTiles() {
    const cont = document.getElementById('container');
    var tiles = [];
    for (var i = 1; i < 33; i++) {
        var tile = document.createElement("div");
        tile.className = "tile";
        tile.id = "tile";
        //strecth the image to fit the tile
        tile.style.backgroundSize = "100% 100%";
        tile.style.backgroundRepeat = "no-repeat";
        tile.style.backgroundPosition = "center";

        //random number between 0 and 41
        var random = Math.floor(Math.random() * 42);
        tile.style.backgroundImage = "url('./classic/" + random + ".jpg')";
        cont.appendChild(tile);
        tiles.push(tile);
    }
    return tiles;
}

//generate the mahjong tiles in the document
var tiles = generateTiles();