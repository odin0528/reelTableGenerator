const analyze_5x3 = (reelTable) => {
  let possibility = 0;
  let totalBonus = 0.0
  for(let a = 0; a < reelTable[0].length - 2; a++){
    for(let b = 0; b < reelTable[1].length - 2; b++){
      for(let c = 0; c < reelTable[2].length - 2; c++){
        for(let d = 0; d < reelTable[3].length - 2; d++){
          for(let e = 0; e < reelTable[4].length - 2; e++){
            //當前版面
            const table = [
              reelTable[0].slice(a, a+3),
              reelTable[1].slice(b, b+3),
              reelTable[2].slice(c, c+3),
              reelTable[3].slice(d, d+3),
              reelTable[4].slice(e, e+3)
            ];

            const {bonus} = config.payline(table)
            totalBonus += bonus
            possibility++;

            /* if(bonus > 1000){
              console.warn(possibility)
              console.warn(bonus)
              console.warn((bonus/possibility).toFixed(2))
              return;
            } */
          }
        }
      }
    }
  }
  console.warn(possibility)
  console.warn(totalBonus)
  console.warn((totalBonus/possibility/config.pay).toFixed(2))
  // return;
}