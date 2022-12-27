const analyze_5x3 = () => {
  let possibility = 0;
  let totalBonus = 0.0
  for(let a = 0; a < cycleReelTable[0].length - 2; a++){
    for(let b = 0; b < cycleReelTable[1].length - 2; b++){
      for(let c = 0; c < cycleReelTable[2].length - 2; c++){
        for(let d = 0; d < cycleReelTable[3].length - 2; d++){
          for(let e = 0; e < cycleReelTable[4].length - 2; e++){
            //當前版面
            const table = [
              cycleReelTable[0].slice(a, a+3),
              cycleReelTable[1].slice(b, b+3),
              cycleReelTable[2].slice(c, c+3),
              cycleReelTable[3].slice(d, d+3),
              cycleReelTable[4].slice(e, e+3)
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
  console.warn((totalBonus/possibility/config.pay).toFixed(4))
  // return;
}