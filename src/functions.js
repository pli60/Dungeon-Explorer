//=============================================================
//========================Background===========================

// function that preload the background
function Background_preload() {
    bg1 = loadImage('assets/Background1.png');
    bg2 = loadImage('assets/Background2.png');
    bg3 = loadImage('assets/Background3.png');
    bg4 = loadImage('assets/Background4.png');
    bg5 = loadImage('assets/Background5.png');
}


function Background_setup() {
    let backg = [bg1, bg2, bg3, bg4, bg5];
    bg = random(backg);
    background(bg);
}

//====================Background End===========================
//=============================================================




//=============================================================
//===========================Tile==============================

// function preload every tile
function Tile_preload() {
    tile_water = loadImage('./assets/Water.png');
    tile_grass = loadImage('./assets/Grass.png');
    tile_road = loadImage('./assets/Road.png');
}


// function that make tilesmap
function Tile_generator() {
    for (var i = 0; i < rooms.length; i++) {

        //draw assets based on the rows and columns
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {
                //seeds the tile generator
                noiseSeed(seeds_noise);

                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                if (noise(row, column) > 0.5) {
                    image(tile_water, row * tilesize, column * tilesize);
                    rooms[i].tiles.push(new array_addTile(row, column, tileID_Water, tileID_None, tileID_None));
                } else {
                    image(tile_grass, row * tilesize, column * tilesize);
                    rooms[i].tiles.push(new array_addTile(row, column, tileID_Grass, tileID_None, tileID_None));
                }
                pop();
                seeds_noise += seeds_noise_increment;
            }
        }//for end

    }


    Tile_fixer();
}


// function that contains rule that fix the tile against the logic, 
//          in other words : procedural generation 
function Tile_fixer() {


}

//=========================Tile End============================
//=============================================================





//  print out data for debugging
function printRoomData() {
    for (var i = 0; i < rooms.length; i++) {
        console.log("ID : " + rooms[i].room_ID);
        console.log("start_x : " + rooms[i].start_x);
        console.log("start_y : " + rooms[i].start_y);
        console.log("room_width : " + rooms[i].room_width);
        console.log("room_height : " + rooms[i].room_height);
        console.log("");
    }
}

//  print out data for debugging

function printRoomTileData() {
    for (var i = 0; i < rooms.length; i++) {
        console.log("ID : " + rooms[i].room_ID);
        
        for(var j = 0; j < rooms[i].tiles.length ; j ++){
            console.log("row: " + rooms[i].tiles[j].tile_row + " column: " + rooms[i].tiles[j].tile_column);
            console.log( rooms[i].tiles[j].layer_0 +  " "  +  rooms[i].tiles[j].layer_1 + " " + rooms[i].tiles[j].layer_2)
        }
    }
}



