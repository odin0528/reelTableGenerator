const oneWay243Line = (table) => {
  const rates = [1,2,3,5]
  const badgeProbability = 0.05
  const badgeBonus = [0,0,4,8,12,20,20,20,20,20,20,20,20,20]
  var freeGameCounter = 0
  var wildTable = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]


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
      freeGameCounter += 8
      enterFreeGameTimes++
    }
  }

  const runFreeGame = () => {
    wildTable = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    for(let x = 0; x < freeGameCounter; x++){
      // console.log('free game:' + x)
      let table = getRandomFreeGameTable()
      table = covertTable(table)
      getSpinResult(table)
      
      // 計算是否再觸發警徽
      let badgeCount = 0
      for(let i = 0; i < 5 ; i++){
        if (Math.random() < badgeProbability ){
          badgeCount++
        }
      }

      if(badgeCount >= 2){
        freeGameCounter += badgeBonus[badgeCount]
        // console.log(`出現警徽數：${badgeCount}`)
        // console.log(`再獲得免費遊戲：${badgeBonus[badgeCount]}(${freeGameCounter})`)
      }
    }
    freeGameTimes += freeGameCounter
  }

  const getSpinResult = (spinTable) => {

    for(let y = 0 ; y < 3 ; y++){
      let lines = 1
      let firstSymbol = spinTable[0][y]
      let link = 1

      if(firstSymbol === 7) continue
      
      for(let x = 1 ; x < 5 ; x++){
        let sameSymbol = spinTable[x].filter(symbol=>symbol===firstSymbol).length
        if(sameSymbol === 0){
          link = x
          break
        }
        lines *= sameSymbol
      }

      const bonus = config.defaultPaytable[firstSymbol][link-1] * lines
      total += bonus
    }
  }

  const covertTable = (table) => {
    for(let x = 0 ; x < 5; x++){
      for(let y = 0 ; y < 4; y++){
        if(wildTable[x][y]){
          table[x][y] = wildTable[x][y]
        } else if(table[x][y] === 12){
          wildTable[x][y] = 12
        } else if(table[x][y] === 13){
          wildTable[x][y] = 13
        } else if(table[x][y] === 14){
          wildTable[x][y] = 14
        }
      }
    }
    return table
  }


  var total = 0.0;

  getSpinResult(table)
  // getScatter()
  runFreeGame()

  /*if(counter >= 3){
    console.log(table)
    console.log(`TOTAL BONUS: ${total.toFixed(2)}`)
    console.log(`LINKS:`, links)
  }*/

  // return {bonus:total, links}
  return {bonus:parseFloat(total.toFixed(2))}
}


