const oneWay243Line = (table) => {
  const freegame = [0,0,12,15,20]
  var freeGameCounter = 0
  var rate = 1
  var wildCount = 0


  // 盤面有3個以上的sc，送8個次免費遊戲
  const getScatter = () =>{
    let counter = 0
    for(let i = 0; i < config.width ; i++){
      if(table[i].indexOf(config.scatter) !== -1){
        counter++
      }
    }

    if(counter >= 3){
      // console.warn(`獲得免費遊戲 8 場`)
      freeGameCounter += freegame[counter-1]
      enterFreeGameTimes++
    }
  }

  const runFreeGame = () => {
    rate = 2
    wildCount = 0
    for(let x = 0; x < freeGameCounter; x++){
      // console.error('free game:' + x)
      let table = getRandomFreeGameTable()
      getSpinResult(table, true)
      getWildFormTable(table)
      rate = (parseInt(wildCount / 3) * 2) + 2
      if(rate > 20) rate = 20

      /* console.warn(`TABLE:`, table)
      console.log(`WILDS COUNT:`, wildCount)
      console.log(`RATE:`, rate)
      console.log(`TOTAL BONUS:`, total) */
    }
  }

  const getSpinResult = (spinTable, isFree) => {

    for(let y = 0 ; y < 3 ; y++){
      let lines = 1
      let firstSymbol = spinTable[0][y]
      let link = 1

      if(firstSymbol === 7) continue
      
      for(let x = 1 ; x < 5 ; x++){
        let sameSymbol = spinTable[x].filter(symbol=>symbol===firstSymbol || symbol===config.wild).length
        if(sameSymbol === 0){
          break
        }
        link = x + 1
        lines *= sameSymbol
      }
      const bonus = config.defaultPaytable[firstSymbol][link-1] * lines * rate
      total += bonus

      /* if(bonus > 0){
        console.log(`LINK SYMBOL: ${firstSymbol} - ${config.symbols[firstSymbol]}`)
        console.log(`LINK: ${link} * ${lines}`)
        console.log(`BONUS: ${bonus.toFixed(2)}`)
      } */
    }
  }

  const getWildFormTable = (table) => {
    for(let x = 0 ; x < 5; x++){
      for(let y = 0 ; y < 3; y++){
        if(table[x][y] === config.wild){
          wildCount++
        }
      }
    }
  }


  var total = 0.0;

  getSpinResult(table, false)
  getScatter()
  runFreeGame()
  // console.log(`TOTAL BONUS:`, total)

  // return {bonus:total, links}
  return {bonus:parseFloat(total.toFixed(2))}
}


