const analyze_5x4 = (reelTable) => {
  let possibility = 0;
  let bonus = 0.0
  for(let a = 0; a < reelTable[0].length - 3; a++){
    for(let b = 0; b < reelTable[1].length - 3; b++){
      for(let c = 0; c < reelTable[2].length - 3; c++){
        for(let d = 0; d < reelTable[3].length - 3; d++){
          for(let e = 0; e < reelTable[4].length - 3; e++){
            //當前版面
            const table = [
              reelTable[0].slice(a, a+4),
              reelTable[1].slice(b, b+4),
              reelTable[2].slice(c, c+4),
              reelTable[3].slice(d, d+4),
              reelTable[4].slice(e, e+4)
            ];

            bonus += config.payline(table)
            possibility++;

            /*if(bonus > 10000){
              console.warn(possibility)
              console.warn(bonus)
              console.warn((bonus/possibility).toFixed(2))
              return;
            }*/
          }
        }
      }
    }
  }
  console.warn(possibility)
  console.warn(bonus)
  console.warn((bonus/possibility/40).toFixed(2))
  // return;
}