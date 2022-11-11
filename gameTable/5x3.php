<?php

class gameTable5x3 {
  function run($reelTable, $payline){
    $possibility = 0;
    $bonus = 0;

    for($a = 0; $a < count($reelTable[0]) - 2; $a++){
      for($b = 0; $b < count($reelTable[1]) - 2; $b++){
        for($c = 0; $c < count($reelTable[2]) - 2; $c++){
          for($d = 0; $d < count($reelTable[3]) - 2; $d++){
            for($e = 0; $e < count($reelTable[4]) - 2; $e++){
              //當前版面
              $table = [
                array_slice($reelTable[0], $a, 3),
                array_slice($reelTable[1], $b, 3),
                array_slice($reelTable[2], $c, 3),
                array_slice($reelTable[3], $d, 3),
                array_slice($reelTable[4], $e, 3),
              ];
  
              $bonus += $payline->run($table);
              $possibility++;

  
              /* if(possibility > 20){
                console.warn(possibility)
                console.warn(bonus)
                console.warn((bonus/possibility).toFixed(2))
                return;
              } */

              // console.warn(possibility)
              // console.warn(bonus)
              // console.warn((bonus/possibility).toFixed(2))
            }
          }
        }
      }
    }

    echo 'possibility:' . $possibility;
    echo 'bonus:' . $bonus;
    echo 'rtp:' . ($bonus / $possibility);
  }
}

?>