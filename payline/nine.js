const twoWay9Payline = (table) => {
  const lines = [
    [1,1,1,1,1],
    [0,0,0,0,0],
    [2,2,2,2,2],
    [0,1,2,1,0],
    [2,1,0,1,2],
    [0,0,1,0,0],
    [2,2,1,2,2],
    [1,0,0,0,1],
    [1,2,2,2,1],
  ];

  const getLineResult = (line) => {
    const left = getLeftSideResult(line)
    const right = left[0] == 5 ? [0, '', 0] : getRightSideResult(line)
    return [left, right]
  }

  const getLeftSideResult = (line) => {
    let bonus = config.defaultPaytable[config.width - 1][line[0]]
    let rate = 1
    let connect = config.width
    if(line[0] == config.scatter) return [1, 'SC', 0]
    for(let i = 1; i <= config.width - 1; i++){
      if(line[i] === config.wild){
        rate = 2
        continue
      }
      if(line[0] != line[i]){
        connect = i
        bonus = config.defaultPaytable[connect-1][line[0]]
        break
      }
    }
    return [connect, config.symbols[line[0]], bonus * rate]
  }

  const getRightSideResult = (line) => {
    let bonus = config.defaultPaytable[config.width - 1][line[config.width - 1]]
    let rate = 1
    let connect = config.width
    if(line[config.width - 1] == config.scatter) return [1, 'SC', 0]
    for(let i = 1; i < config.width; i++){
      if(line[config.width - i - 1] === config.wild){
        rate = 2
        continue
      }
      if(line[config.width-1] != line[config.width - i - 1]){
        connect = i
        bonus = config.defaultPaytable[connect-1][line[config.width-1]]
        break
      }
    }
    return [connect, config.symbols[line[config.width-1]], bonus * rate]
  }

  const getScatter = () =>{
    let ls = 0
    let lb = 0
    let rs = 0
    let rb = 0

    for(let i = 0; i < config.width ; i++){
      if(table[i].indexOf(config.scatter) === -1){
        if(i === 0) break;
        ls = i
        lb = config.defaultPaytable[ls-1][config.scatter]
        break;
      }
    }

    for(let i = config.width; i > 0 ; i--){
      if(table[i-1].indexOf(config.scatter) === -1){
        if(i === config.width) break;
        rs = config.width - i
        rb = config.defaultPaytable[rs-1][config.scatter]
        break;
      }
    }

    return [[ls, 'SC', lb * 9], [rs, 'SC', rb * 9]]
  }

  let bonus = 0.0;
  const links = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ]
  for(let i=0; i < lines.length; i++){
    const line = [
      table[0][lines[i][0]],
      table[1][lines[i][1]],
      table[2][lines[i][2]],
      table[3][lines[i][3]],
      table[4][lines[i][4]]
    ]
    const result = getLineResult(line)
    bonus += parseFloat((result[0][2] + result[1][2]).toFixed(2))

    /* if(result[0][2] > 0 || result[1][2] > 0){
      links[lines[i][0]][0] = 1
      links[lines[i][1]][1] = 1
      links[lines[i][2]][2] = 1
      links[lines[i][3]][3] = 1
      links[lines[i][4]][4] = 1
    } */
  }

  const scatter = getScatter()
  bonus += scatter[0][2] + scatter[1][2]

  return {bonus}
  // return {bonus, links}
}


