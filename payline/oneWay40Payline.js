const oneWay40Payline = (table) => {
  const lines = config.lines;
  const rates = [1,2,3,5]
  const badgeProbability = 0.02
  const badgeBonus = [0,0,4,8,12,20,20,20,20,20,20,20,20,20]
  var freeGameTimes = 0
  var wildTable = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  const getLineResult = (line) => {
    let bonus = config.defaultPaytable[config.width - 1][line[0]]
    let wildCount = 0;
    let connect = config.width
    if(line[0] == config.scatter) return [1, 'SC', 0]
    for(let i = 1; i <= config.width - 1; i++){
      if(line[i] === config.wild){
        wildCount++
        continue
      }
      if(line[0] != line[i]){
        connect = i
        bonus = config.defaultPaytable[connect-1][line[0]]
        break
      }
    }
    return [connect, config.symbols[line[0]], bonus * rates[wildCount]]
  }

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
      freeGameTimes += 8
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
    for(let x = 0; x < freeGameTimes; x++){
      // console.log('free game:' + x)
      let table = getRandomTable()
      table = covertTable(table)
      getSpinResult(table)
      
      // 計算是否再觸發警徽
      let badgeCount = 0
      for(let i = 0; i < 20 ; i++){
        if (Math.random() < badgeProbability ){
          badgeCount++
        }
      }

      if(badgeCount >= 2){
        freeGameTimes += badgeBonus[badgeCount]
        // console.log(`出現警徽數：${badgeCount}`)
        // console.log(`再獲得免費遊戲：${badgeBonus[badgeCount]}(${freeGameTimes})`)
      }
    }
  }

  const getSpinResult = (spinTable) => {
    for(let i=0; i < lines.length; i++){
      const line = [
        spinTable[0][lines[i][0]],
        spinTable[1][lines[i][1]],
        spinTable[2][lines[i][2]],
        spinTable[3][lines[i][3]],
        spinTable[4][lines[i][4]]
      ]
      const result = getLineResult(line)
      const bonus = parseFloat(result[2].toFixed(2))
      total += bonus
  
      if(bonus > 0){
        counter++
        links.push([i+1, ...result])
      }
    }
  }

  const covertTable = (table) => {
    for(let x = 0 ; x < 5; x++){
      for(let y = 0 ; y < 4; y++){
        if(table[x][y] === config.wild){
          wildTable[x][y] = 1
        }else if(wildTable[x][y]){
          table[x][y] = config.wild
        }
      }
    }
    return table
  }


  var total = 0.0;
  var counter = 0
  var links = []

  getSpinResult(table)
  getScatter()
  runFreeGame()

  /*if(counter >= 3){
    console.log(table)
    console.log(`TOTAL BONUS: ${total.toFixed(2)}`)
    console.log(`LINKS:`, links)
  }*/

  return {bonus:total}
}


