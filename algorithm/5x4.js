const analyze_5x4 = () => {
  let possibility = 0;
  let totalBonus = 0.0
  for(let a = 0; a < cycleReelTable[0].length - 3; a++){
    for(let b = 0; b < cycleReelTable[1].length - 3; b++){
      for(let c = 0; c < cycleReelTable[2].length - 3; c++){
        for(let d = 0; d < cycleReelTable[3].length - 3; d++){
          for(let e = 0; e < cycleReelTable[4].length - 3; e++){
            //當前版面
            const table = [
              cycleReelTable[0].slice(a, a+4),
              cycleReelTable[1].slice(b, b+4),
              cycleReelTable[2].slice(c, c+4),
              cycleReelTable[3].slice(d, d+4),
              cycleReelTable[4].slice(e, e+4)
            ];

            const {bonus} = config.payline(table)
            totalBonus += bonus.toFixed(2)
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
  console.warn(totalBonus)
  console.warn((totalBonus/possibility/config.pay).toFixed(4))
  // return;
}