
function draw_text(){

    fill(255, 255, 255);
    rect(18, 20, 320, 80, 20);
    fill(0, 0, 0);
    textSize(20);
    text('Click ground to add slimes', 20, 50);
    text('Refresh page to get different seeds', 20, 90);
  }
  

  function draw_map(){
  
    // image(tile_water, column * tilesize, row * tilesize);
    // room_canvas[0].tiles[row][column] = new array_addTile(row, column, tileID_Water, tileID_None, tileID_None);
  
    for (var row = 0; row < canvas_height / tilesize; row++) {
      for (var column = 0; column < canvas_width / tilesize; column++) {
  
  
  
        image(tile_water, column * tilesize, row * tilesize);
  
        //image(tile_turtle, column * tilesize, row * tilesize);
        if(room_canvas[0].tiles[row][column].layer_0 == tileID_Water){
  
  
          if(room_canvas[0].tiles[row][column].layer_1 == tileID_turtle){
            image(tile_turtle, column * tilesize, row * tilesize);
  
          }else if(room_canvas[0].tiles[row][column].layer_1 == tileID_turtle2){
            image(tile_turtle2, column * tilesize, row * tilesize);
  
          }else if(room_canvas[0].tiles[row][column].layer_1 == tileID_None){
            image(tile_water, column * tilesize, row * tilesize);
          }else{}
  
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_Grass){
  
          image(tile_grass, column * tilesize, row * tilesize);
  
          if(room_canvas[0].tiles[row][column].layer_1 == tileID_Rock){
            image(tile_rock, column * tilesize, row * tilesize);
  
          }else if(room_canvas[0].tiles[row][column].layer_1 == tileID_Flower){
            image(tile_flower, column * tilesize, row * tilesize);
  
          }else if(room_canvas[0].tiles[row][column].layer_1 == tileID_frog){
            image(tile_frog, column * tilesize, row * tilesize);
  
          }else if(room_canvas[0].tiles[row][column].layer_1 == tileID_None){
  
          } else{}
  
  
          if(room_canvas[0].tiles[row][column].layer_2 == tileID_redSlime){
            image(tile_slime2, column * tilesize, row * tilesize);
          }else if(room_canvas[0].tiles[row][column].layer_2 == tileID_greenSlime){
            image(tile_slime1, column * tilesize, row * tilesize);
          }else{}
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_top){
          image(tile_overlap_top, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_down){
          image(tile_overlap_down, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_right){
          image(tile_overlap_right, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_left){
          image(tile_overlap_left, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_topLeft){
          image(tile_overlap_topLeft, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_topRight){
          image(tile_overlap_topRight, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_downLeft){
          image(tile_overlap_downLeft, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_overlap_downRight){
          image(tile_overlap_downRight, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_top){
          image(tile_island_top, column * tilesize, row * tilesize);
          
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_down){
          image(tile_island_down, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_left){
          image(tile_island_left, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_right){
          image(tile_island_right, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_conj_top){
          image(tile_island_conj_top, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_conj_down){
          image(tile_island_conj_down, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_conj_left){
          image(tile_island_conj_left, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_island_conj_right){
          image(tile_island_conj_right, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_cross_leftRight){
          image(tile_cross_leftRight, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_cross_topBot){
          image(tile_cross_topBot, column * tilesize, row * tilesize);
  
        }else if(room_canvas[0].tiles[row][column].layer_0 == tileID_Bridge){
          image(tile_bridge, column * tilesize, row * tilesize);
        }
  
  
      }
  
  }
    
  }
  