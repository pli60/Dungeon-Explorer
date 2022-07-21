
//=============================================================
//==========================Preload============================
function all_preload() {
    tile_waterBC = loadImage('./assets/Water.png');
    tile_bridge = loadImage('./assets/Bridge.png');
    tile_water = loadImage('./assets/Water.png');
    tile_grass = loadImage('./assets/Grass.png');
    tile_road = loadImage('./assets/Road.png');


    tile_flower = loadImage('./assets/Flower.png');
    tile_rock = loadImage('./assets/Rock.png');
    tile_frog = loadImage('./assets/Frog.png');

    tile_turtle = loadImage('./assets/Turtle.png');
    tile_turtle1 = loadImage('./assets/Turtle1.png');
    tile_turtle2 = loadImage('./assets/Turtle2.png');


    tile_slime1 = loadImage('./assets/interaction/Greenslime.png');
    tile_slime2 = loadImage('./assets/interaction/Redslime.png');


    tile_None = loadImage('./assets/None.png');


    tile_overlap_top = loadImage('./assets/overlap/overlap_top.png');
    tile_overlap_down = loadImage('./assets/overlap/overlap_down.png');
    tile_overlap_right = loadImage('./assets/overlap/overlap_right.png');
    tile_overlap_left = loadImage('./assets/overlap/overlap_left.png');

    tile_island_top = loadImage('./assets/overlap/island_top.png');
    tile_island_down = loadImage('./assets/overlap/island_down.png');
    tile_island_left = loadImage('./assets/overlap/island_left.png');
    tile_island_right = loadImage('./assets/overlap/island_right.png');


    tile_island_conj_top = loadImage('./assets/overlap/island_conj_top.png');
    tile_island_conj_down = loadImage('./assets/overlap/island_conj_down.png');
    tile_island_conj_left = loadImage('./assets/overlap/island_conj_left.png');
    tile_island_conj_right = loadImage('./assets/overlap/island_conj_right.png');


    tile_overlap_topLeft = loadImage('./assets/overlap/overlap_topLeft.png');
    tile_overlap_topRight = loadImage('./assets/overlap/overlap_topRight.png');
    tile_overlap_downLeft = loadImage('./assets/overlap/overlap_downLeft.png');
    tile_overlap_downRight = loadImage('./assets/overlap/overlap_downRight.png');

    tile_cross_topBot = loadImage('./assets/overlap/cross_topBot.png');
    tile_cross_leftRight = loadImage('./assets/overlap/cross_leftRight.png');


    life_seagull = loadImage('./assets/sprite/SeagullSheet.png');
    life_seagull_json = loadJSON('./assets/sprite/json/Seagull.json');

}



//=======================Preload End===========================
//=============================================================


//=============================================================
//========================Background===========================



function Background_setup() {

    room_canvas.push(new array_addRoom(0, 0, 0, canvas_width, canvas_height));
    for (var row = 0; row < canvas_height / tilesize; row++) {
        for (var column = 0; column < canvas_width / tilesize; column++) {
            image(tile_waterBC, column * tilesize, row * tilesize);
            room_canvas[0].tiles[row][column] = new array_addTile(row, column, tileID_Water, tileID_None, tileID_None);

        }

    }


}


function draw_bridge(draw_startRow, draw_startColumn, draw_length, draw_height) {




    for (var row = draw_startRow; row < draw_startRow + draw_height; row++) {
        for (var column = draw_startColumn; column < draw_startColumn + draw_length; column++) {


            if (room_canvas[0].tiles[row][column].layer_0 == tileID_Water && room_canvas[0].tiles[row][column].layer_1 != tileID_turtle &&
                room_canvas[0].tiles[row][column].layer_1 != tileID_turtle2) {


                image(tile_bridge, column * tilesize, row * tilesize);
                room_canvas[0].tiles[row][column] = new array_addTile(row, column, tileID_Bridge, tileID_None, tileID_None);

            }
        }
    }




}

//====================Background End===========================
//=============================================================






//=============================================================
//======================= Seagulls ============================
function seagull_setup() {

    let frames = life_seagull_json.frames;
    for (var i = 0; i < frames.length; i++) {
        let pos = frames[i].position;
        let img = life_seagull.get(pos.x, pos.y, pos.w, pos.h);
        animation.push(img);
    }


    seagulls_amount = random(40, 50);
    let seagulls_speedX = random(0.3, 0.7)
    let seagulls_speedY = random(0.3, 0.7)



    for (var i = 0; i < seagulls_amount; i++) {
        seagulls[i] = new array_addSeagull(animation, random(50, canvas_width), random(50, canvas_height), seagulls_speedX, seagulls_speedY);
    }


}
//=====================Seagulls end============================
//=============================================================





//=============================================================
//===========================Tile==============================

// helper function used in Tile_generator
//       that draw a tile
function Tile_drawATile(tileType, roomID, row, column, layer0, layer1, layer2) {


    //reset the tile that has already been used 

    var actual_row = (rooms[roomID].start_y + row * tilesize) / tilesize;
    var actual_column = (rooms[roomID].start_x + column * tilesize) / tilesize;
    var layer0 = layer0;
    var layer1 = layer1;
    var layer2 = layer2;

    //draw layer0 if the tile hasn't been used yet
    if (layer1 == tileID_None) {
        image(tileType, column * tilesize, row * tilesize);
        //make two-d array 
        rooms[roomID].tiles[row][column] = new array_addTile(row, column, layer0, layer1, layer2);

        room_canvas[0].tiles[actual_row][actual_column] = new array_addTile(actual_row, actual_column, layer0, layer1, layer2);


    } else if (layer1 == tileID_turtle) {
        image(tileType, column * tilesize, row * tilesize);
        rooms[roomID].tiles[row][column] = new array_addTile(row, column, layer0, layer1, layer2);
        rooms[roomID].tiles[row][column + 1] = new array_addTile(row, column + 1, layer0, tileID_turtle2, layer2);

        room_canvas[0].tiles[actual_row][actual_column] = new array_addTile(actual_row, actual_column, layer0, layer1, layer2);
        room_canvas[0].tiles[actual_row][actual_column + 1] = new array_addTile(actual_row, actual_column + 1, layer0, tileID_turtle2, layer2);


    } else {
        //layer1 exist case, which means adding obj instead of adding background
        image(tileType, column * tilesize, row * tilesize);
        rooms[roomID].tiles[row][column] = new array_addTile(row, column, layer0, layer1, layer2);

        room_canvas[0].tiles[actual_row][actual_column] = new array_addTile(actual_row, actual_column, layer0, layer1, layer2);

    }
}

// function that make tilesmap
function Tile_generator() {


    this.distance_row_to_topEdge = 0;
    this.distance_row_to_bottomEdge = 0;
    this.distance_column_to_leftEdge = 0;
    this.distance_column_to_rightEdge = 0;



    //for loop will setup array for drawing
    //  crop the room into 32*32 tiles and store their information into array
    //  draw the basic inner contents (the edge will be drawed over this layer)
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

                //detemine the how far the current tiles are from the edges
                this.distance_row_to_topEdge = row - 0;
                this.distance_row_to_bottomEdge = rooms[i].tiles_row - 1 - row;
                this.distance_column_to_leftEdge = column - 0;
                this.distance_column_to_rightEdge = rooms[i].tiles_column - 1 - column;

                //find smallest distance
                this.distanceArray = [this.distance_row_to_topEdge, this.distance_row_to_bottomEdge, this.distance_column_to_leftEdge, this.distance_column_to_rightEdge];
                this.minDistance = Math.min.apply(Math, this.distanceArray);


                //if the tile is closer to the edges, it's more likely will generate the edge
                if (this.minDistance <= 1 && this.minDistance > 0) {
                    if (noise(row, column) > 0.4) {
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    } else {
                        Tile_drawATile(tile_grass, i, row, column, tileID_Grass, tileID_None, tileID_None);
                    }
                    //only spawn water tile if it's edge
                } else if (this.minDistance == 0) {


                    Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);

                } else {

                    //other wise it will generate the ground 

                    if (noise(row, column) > 0.75) {
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    } else {

                        Tile_drawATile(tile_grass, i, row, column, tileID_Grass, tileID_None, tileID_None);

                    }

                }
                pop();
                seeds_noise += seeds_noise_increment;

            }
        }
    }






    Tile_fixer();
    Tile_fixer2();
    Tile_fixer3();


    AddObjects();

}


// function that add second layer to the exist ground
function AddObjects() {

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


                if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {


                    var grassTileCount = 0;
                    var adj_row = 0;
                    var adj_column = 0;
                    //check if it's inner ground, the grass is inside not the edge
                    if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {

                        //adj is used to check all adj tiles of the current tile
                        for (var adj = 0; adj < 4; adj++) {

                            adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                            adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;

                            if (rooms[i].tiles[adj_row][adj_column] != null) {
                                if (rooms[i].tiles[adj_row][adj_column].layer_0 == tileID_Grass) {
                                    grassTileCount++;
                                }
                            }

                        }// //adj check end


                        if (grassTileCount >= 3) {
                            if (noise(row, column) < 1 && noise(row, column) > 0.45) {
                                Tile_drawATile(tile_flower, i, row, column, tileID_Grass, tileID_Flower, tileID_None);
                            } else if (noise(row, column) <= 0.4 && noise(row, column) > 0.36) {
                                Tile_drawATile(tile_rock, i, row, column, tileID_Grass, tileID_Rock, tileID_None);
                            } else if (noise(row, column) <= 0.33 && noise(row, column) > 0.3) {
                                Tile_drawATile(tile_frog, i, row, column, tileID_Grass, tileID_frog, tileID_None);
                            }
                        }

                    }
                }//grass add obj end

                if (rooms[i].tiles[row][column].layer_0 == tileID_Water) {

                    adj = 3;
                    adj_row3 = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                    adj_column3 = rooms[i].tiles[row][column].adjTile[adj].tile_column;



                    if (rooms[i].tiles[adj_row3][adj_column3] != null) {
                        if (rooms[i].tiles[adj_row3][adj_column3].layer_0 == tileID_Water && rooms[i].tiles[row][column].layer_1 != tileID_turtle) {

                            if (noise(row, column) < 1 && noise(row, column) > 0.75) {
                                Tile_drawATile(tile_turtle, i, row, column, tileID_Water, tileID_turtle, tileID_None);
                            }


                        }
                    }

                }

                pop();
                seeds_noise += seeds_noise_increment;

            }
        }
    }


}



// function that contains rule that fix the tile against the logic, 
//          in other words : procedural generation 
function Tile_fixer() {

    /*
    rule #1:   the ground won't be surrounded by the water 
    rule #2:   the water next to the ground will show the overlapping 
    */


    for (var i = 0; i < rooms.length; i++) {
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {

                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                //rule #1

                var waterTileCount = 0;
                var adj_row = 0;
                var adj_column = 0;

                if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {

                    //adj is used to check all adj tiles of the current tile
                    for (var adj = 0; adj < 4; adj++) {

                        adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                        adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;

                        if (rooms[i].tiles[adj_row][adj_column] != null) {
                            if (rooms[i].tiles[adj_row][adj_column].layer_0 == tileID_Water) {
                                waterTileCount++;
                            }
                        }

                    }// //adj check end

                    if (waterTileCount == 4) {
                        Tile_drawATile(tile_water, i, row, column, tileID_Water, tileID_None, tileID_None);
                    }
                    waterTileCount = 0;

                }//rule 1 end



                //rule #2
                adj_row = 0;
                adj_column = 0;
                flag_topisWater = false;
                flag_downisWater = false;
                flag_leftisWater = false;
                flag_rightisWater = false;

                //make sure the edges won't run this loop becasue they don't have adj

                if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {


                    //adj is used to check all adj tiles of the current tile
                    for (var adj = 0; adj < 4; adj++) {

                        adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                        adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;

                        //after the if loop, it wil know where the water is
                        if (rooms[i].tiles[adj_row][adj_column] != null) {
                            if (rooms[i].tiles[adj_row][adj_column].layer_0 == tileID_Water) {
                                if (adj == 0) {
                                    flag_topisWater = true;
                                } else if (adj == 1) {
                                    flag_downisWater = true;
                                } else if (adj == 2) {
                                    flag_leftisWater = true;
                                } else {
                                    flag_rightisWater = true;
                                }
                            }
                        }

                    }// //adj check end




                    //draw edge
                    if (flag_topisWater == true) {

                        if (flag_rightisWater == true && flag_leftisWater == false) {
                            Tile_drawATile(tile_overlap_topRight, i, row, column, tileID_overlap_topRight, tileID_None, tileID_None);
                        } else if (flag_rightisWater == false && flag_leftisWater == true) {
                            Tile_drawATile(tile_overlap_topLeft, i, row, column, tileID_overlap_topLeft, tileID_None, tileID_None);
                        } else if (flag_rightisWater == true && flag_leftisWater == true) {
                            // case 3 sides surrounded by the water
                            Tile_drawATile(tile_island_top, i, row, column, tileID_island_top, tileID_None, tileID_None);
                        } else {
                            Tile_drawATile(tile_overlap_top, i, row, column, tileID_overlap_top, tileID_None, tileID_None);
                        }

                        // Tile_drawATile(tile_overlap_top, i, row, column, tileID_overlap_top, tileID_None, tileID_None);
                    } else if (flag_downisWater == true) {

                        if (flag_rightisWater == true && flag_leftisWater == false) {
                            Tile_drawATile(tile_overlap_downRight, i, row, column, tileID_overlap_downRight, tileID_None, tileID_None);
                        } else if (flag_rightisWater == false && flag_leftisWater == true) {
                            Tile_drawATile(tile_overlap_downLeft, i, row, column, tileID_overlap_downLeft, tileID_None, tileID_None);
                        } else if (flag_rightisWater == true && flag_leftisWater == true) {
                            // case 3 sides surrounded by the water
                            Tile_drawATile(tile_island_down, i, row, column, tileID_island_down, tileID_None, tileID_None);
                        } else {
                            Tile_drawATile(tile_overlap_down, i, row, column, tileID_overlap_down, tileID_None, tileID_None);
                        }


                        // Tile_drawATile(tile_overlap_down, i, row, column, tileID_overlap_down, tileID_None, tileID_None);
                    } else if (flag_leftisWater == true) {
                        Tile_drawATile(tile_overlap_left, i, row, column, tileID_overlap_left, tileID_None, tileID_None);
                    } else if (flag_rightisWater == true) {
                        Tile_drawATile(tile_overlap_right, i, row, column, tileID_overlap_right, tileID_None, tileID_None);
                    } else {
                        // do nothing if it's in the middle, doesn't next to the water
                    }




                    //make island if 3 sides surrounded by the water
                    if (flag_leftisWater == true && flag_rightisWater == true) {

                        if (flag_topisWater == true) {
                            Tile_drawATile(tile_island_top, i, row, column, tileID_island_top, tileID_None, tileID_None);
                        } else if (flag_downisWater == true) {
                            Tile_drawATile(tile_island_down, i, row, column, tileID_island_down, tileID_None, tileID_None);
                        }

                    } else if (flag_topisWater == true && flag_downisWater == true) {

                        if (flag_leftisWater == true) {
                            Tile_drawATile(tile_island_left, i, row, column, tileID_island_left, tileID_None, tileID_None);
                        } else if (flag_rightisWater == true) {
                            Tile_drawATile(tile_island_right, i, row, column, tileID_island_right, tileID_None, tileID_None);
                        }
                    }


                }//rule 2 end
                pop();
            }
        }
    }

}



// function that contains rule that fix the tile against the logic, but it will process after the fixer1
//          in other words : procedural generation 
function Tile_fixer2() {


    //    rule #2+:   the water next to the ground will show the overlapping 
    //             process in 2: make connection between island tile and ground
    for (var i = 0; i < rooms.length; i++) {
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {

                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                var adj_row = 0;
                var adj_column = 0;
                var adj = 0;


                //make sure the edges won't run this loop becasue they don't have adj


                if (rooms[i].tiles[row][column].layer_0 == tileID_island_top) {

                    //fine the tile below
                    adj = 1;
                    adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                    adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                    Tile_drawATile(tile_island_conj_top, i, adj_row, adj_column, tileID_island_conj_top, tileID_None, tileID_None);
                } else if (rooms[i].tiles[row][column].layer_0 == tileID_island_down) {
                    //fine the tile above
                    adj = 0;
                    adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                    adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                    Tile_drawATile(tile_island_conj_down, i, adj_row, adj_column, tileID_island_conj_down, tileID_None, tileID_None);

                } else if (rooms[i].tiles[row][column].layer_0 == tileID_island_right) {
                    //fine the tile left
                    adj = 2;
                    adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                    adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                    Tile_drawATile(tile_island_conj_right, i, adj_row, adj_column, tileID_island_conj_right, tileID_None, tileID_None);
                } else if (rooms[i].tiles[row][column].layer_0 == tileID_island_left) {
                    //fine the tile right
                    adj = 3;
                    adj_row = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                    adj_column = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                    Tile_drawATile(tile_island_conj_left, i, adj_row, adj_column, tileID_island_conj_left, tileID_None, tileID_None);
                } else {

                }//rule 2+ end

                pop();
            }
        }
    }



}



// function that contains rule that fix the tile against the logic, but it will process after the fixer1
//          in other words : procedural generation +
function Tile_fixer3() {


    //    rule #2++:   the water next to the ground will show the overlapping 
    //             process in 2: make connection between island tile and ground
    for (var i = 0; i < rooms.length; i++) {
        for (var row = 0; row < rooms[i].tiles_row; row++) {
            for (var column = 0; column < rooms[i].tiles_column; column++) {

                //must push and pop before use translate 
                push();
                //translate the origin to start_x, start_y  (treat that point as 0, 0)
                translate(rooms[i].start_x, rooms[i].start_y);

                adj = 0;
                adj_row0 = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                adj_column0 = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                adj = 1;
                adj_row1 = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                adj_column1 = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                adj = 2;
                adj_row2 = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                adj_column2 = rooms[i].tiles[row][column].adjTile[adj].tile_column;
                adj = 3;
                adj_row3 = rooms[i].tiles[row][column].adjTile[adj].tile_row;
                adj_column3 = rooms[i].tiles[row][column].adjTile[adj].tile_column;


                //fix cross issue
                if (rooms[i].tiles[row][column].layer_0 == tileID_Grass) {
                    if (rooms[i].tiles[adj_row0][adj_column0].layer_0 == tileID_overlap_right || rooms[i].tiles[adj_row0][adj_column0].layer_0 == tileID_overlap_topRight) {
                        if (rooms[i].tiles[adj_row1][adj_column1].layer_0 == tileID_overlap_left || rooms[i].tiles[adj_row1][adj_column1].layer_0 == tileID_overlap_downLeft) {
                            if (rooms[i].tiles[adj_row2][adj_column2].layer_0 == tileID_overlap_down || rooms[i].tiles[adj_row2][adj_column2].layer_0 == tileID_overlap_downLeft) {
                                if (rooms[i].tiles[adj_row3][adj_column3].layer_0 == tileID_overlap_top || rooms[i].tiles[adj_row3][adj_column3].layer_0 == tileID_overlap_topRight) {
                                    Tile_drawATile(tile_cross_topBot, i, row, column, tileID_cross_topBot, tileID_None, tileID_None);
                                }
                            }
                        }
                    }


                    if (rooms[i].tiles[adj_row0][adj_column0].layer_0 == tileID_overlap_left || rooms[i].tiles[adj_row0][adj_column0].layer_0 == tileID_overlap_topLeft) {
                        if (rooms[i].tiles[adj_row1][adj_column1].layer_0 == tileID_overlap_right || rooms[i].tiles[adj_row1][adj_column1].layer_0 == tileID_overlap_downRight) {
                            if (rooms[i].tiles[adj_row2][adj_column2].layer_0 == tileID_overlap_top || rooms[i].tiles[adj_row2][adj_column2].layer_0 == tileID_overlap_topLeft) {
                                if (rooms[i].tiles[adj_row3][adj_column3].layer_0 == tileID_overlap_down || rooms[i].tiles[adj_row3][adj_column3].layer_0 == tileID_overlap_downRight) {
                                    Tile_drawATile(tile_cross_leftRight, i, row, column, tileID_cross_leftRight, tileID_None, tileID_None);
                                }
                            }
                        }
                    }
                }




                pop();
            }
        }
    }



}
//=========================Tile End============================
//=============================================================




//=============================================================
//=======================P5 js Event===========================


function mouseClicked() {
    // fill(0, 0, 0);
    // text("(" + parseInt(mouseY / 32) + ", " + parseInt(mouseX / 32) + ")", mouseX, mouseY);


    var check_flag = random(0, 10);

    var tile_addRow = parseInt(mouseY / 32);
    var tile_addColumn = parseInt(mouseX / 32);
    var current_layer0 = room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_0;
    var current_layer1 = room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_1;


    //add slime when layer 2 is not used, add red slime if it's around frog
    if (room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_2 == tileID_None) {

        if (room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_0 == tileID_Grass) {

            //frog and rock tile won't be used 
            if (room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_1 != tileID_Rock && room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_1 != tileID_frog) {


                //adj frog will be redslime
                if (room_canvas[0].tiles[tile_addRow - 1][tile_addColumn].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow - 1][tile_addColumn + 1].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow - 1][tile_addColumn - 1].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow][tile_addColumn + 1].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow][tile_addColumn - 1].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow + 1][tile_addColumn].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow + 1][tile_addColumn + 1].layer_1 == tileID_frog ||
                    room_canvas[0].tiles[tile_addRow + 1][tile_addColumn - 1].layer_1 == tileID_frog
                ) {
                    image(tile_slime2, tile_addColumn * tilesize, tile_addRow * tilesize);
                    room_canvas[0].tiles[tile_addRow][tile_addColumn] = new array_addTile(tile_addRow, tile_addColumn, current_layer0, current_layer1, tileID_redSlime);

                } else {



                    if (check_flag > 1) {
                        image(tile_slime1, tile_addColumn * tilesize, tile_addRow * tilesize);
                        room_canvas[0].tiles[tile_addRow][tile_addColumn] = new array_addTile(tile_addRow, tile_addColumn, current_layer0, current_layer1, tileID_greenSlime);
                    } else {
                        image(tile_slime2, tile_addColumn * tilesize, tile_addRow * tilesize);
                        room_canvas[0].tiles[tile_addRow][tile_addColumn] = new array_addTile(tile_addRow, tile_addColumn, current_layer0, current_layer1, tileID_redSlime);
                    }
                }


            }




        }
    } else if (room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_2 == tileID_greenSlime) {
        image(tile_slime2, tile_addColumn * tilesize, tile_addRow * tilesize);
        room_canvas[0].tiles[tile_addRow][tile_addColumn] = new array_addTile(tile_addRow, tile_addColumn, current_layer0, current_layer1, tileID_redSlime);
    } else if (room_canvas[0].tiles[tile_addRow][tile_addColumn].layer_2 == tileID_redSlime) {
        //image(tile_slime2, tile_addColumn * tilesize, tile_addRow * tilesize);
        room_canvas[0].tiles[tile_addRow][tile_addColumn] = new array_addTile(tile_addRow, tile_addColumn, current_layer0, current_layer1, tileID_None);
    }


    //image(tileType, column * tilesize, row * tilesize);


}

//=======================P5 js Event===========================
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

        for (var j = 0; j < rooms[i].tiles.length; j++) {
            console.log("row: " + rooms[i].tiles[j].tile_row + " column: " + rooms[i].tiles[j].tile_column);
            console.log(rooms[i].tiles[j].layer_0 + " " + rooms[i].tiles[j].layer_1 + " " + rooms[i].tiles[j].layer_2)
        }
    }
}



