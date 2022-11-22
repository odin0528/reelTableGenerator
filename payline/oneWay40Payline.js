const oneWay40Payline = (table) => {
  const lines = [
    [0,0,0,0,0],
    [1,1,1,1,1],
    [2,2,2,2,2],
    [3,3,3,3,3],
    [0,1,0,1,0],
    [1,0,1,0,1],
    [1,2,1,2,1],
    [2,1,2,1,2],
    [2,3,2,3,2],
    [3,2,3,2,3],
    [0,3,0,3,0],
    [3,0,3,0,3],
    [0,1,2,1,0],
    [1,2,3,2,1],
    [2,1,0,1,2],
    [3,2,1,2,3],
    [0,0,1,0,0],
    [1,1,2,1,1],
    [2,2,3,2,2],
    [3,3,0,3,3],
    [3,3,2,3,3],
    [2,2,1,2,2],
    [1,1,0,1,1],
    [0,0,3,0,0],
    [0,1,1,1,0],
    [1,2,2,2,1],
    [2,3,3,3,2],
    [3,0,0,0,3],
    [3,2,2,2,3],
    [2,1,1,1,2],
    [1,0,0,0,1],
    [0,3,3,3,0],
    [1,3,1,3,1],
    [0,2,0,2,0],
    [2,0,2,0,2],
    [3,1,3,1,3],
    [3,2,1,0,1],
    [0,1,2,3,2],
    [3,0,1,0,3],
    [0,3,2,3,0],
  ];

  const getLineResult = (line) => {
    let bonus = config.defaultPaytable[config.width - 1][line[0]]
    let rate = 1
    let connect = config.width
    if(line[0] == config.scatter) return [1, 'SC', 0]
    for(let i = 1; i <= config.width - 1; i++){
      /* if(line[i] === config.wild){
        rate = 2
        continue
      } */
      if(line[0] != line[i]){
        connect = i
        bonus = config.defaultPaytable[connect-1][line[0]]
        break
      }
    }
    return [connect, config.symbols[line[0]], bonus * rate]
  }

  const getScatter = () =>{
    let ls = 0
    let lb = 0
    let rs = 0
    let rb = 0

    for(let i = 0; i < config.width ; i++){
      if(table[i].indexOf(config.scatter) === -1 && i > 0){
        ls = i
        lb = config.defaultPaytable[ls-1][config.scatter]
        break;
      }
    }

    for(let i = config.width; i > 0 ; i--){
      if(table[i-1].indexOf(config.scatter) === -1 && i < config.width){
        rs = config.width - i
        rb = config.defaultPaytable[rs-1][config.scatter]
        break;
      }
    }

    return [[ls, 'SC', lb * 9], [rs, 'SC', rb * 9]]
  }

  let total = 0.0;
  let counter = 0
  let links = []

  for(let i=0; i < lines.length; i++){
    const line = [
      table[0][lines[i][0]],
      table[1][lines[i][1]],
      table[2][lines[i][2]],
      table[3][lines[i][3]],
      table[4][lines[i][4]]
    ]
    const result = getLineResult(line)
    const bonus = parseFloat(result[2].toFixed(2))
    total += bonus

    if(bonus > 0){
      counter++
      links.push([i+1, ...result])
    }
  }
  // const scatter = getScatter()

  
  /*if(counter >= 3){
    console.log(table)
    console.log(`TOTAL BONUS: ${total.toFixed(2)}`)
    console.log(`LINKS:`, links)
  }*/

  return total
}


