const twoWay9Payline = (table) => {
  const getLine1 = () => {
    const line = [table[0][1],table[1][1],table[2][1],table[3][1],table[4][1]]
    return getLineResult(line)
  }
  const getLine2 = () => {
    const line = [table[0][0],table[1][0],table[2][0],table[3][0],table[4][0]]
    return getLineResult(line)
  }
  const getLine3 = () => {
    const line = [table[0][2],table[1][2],table[2][2],table[3][2],table[4][2]]
    return getLineResult(line)
  }
  const getLine4 = () => {
    const line = [table[0][0],table[1][1],table[2][2],table[3][1],table[4][0]]
    return getLineResult(line)
  }
  const getLine5 = () => {
    const line = [table[0][2],table[1][1],table[2][0],table[3][1],table[4][2]]
    return getLineResult(line)
  }
  const getLine6 = () => {
    const line = [table[0][0],table[1][0],table[2][1],table[3][0],table[4][0]]
    return getLineResult(line)
  }
  const getLine7 = () => {
    const line = [table[0][2],table[1][2],table[2][1],table[3][2],table[4][2]]
    return getLineResult(line)
  }
  const getLine8 = () => {
    const line = [table[0][1],table[1][0],table[2][0],table[3][0],table[4][1]]
    return getLineResult(line)
  }
  const getLine9 = () => {
    const line = [table[0][1],table[1][2],table[2][2],table[3][2],table[4][1]]
    return getLineResult(line)
  }

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

  let bonus = 0.0;
  const line1 = getLine1()
  const line2 = getLine2()
  const line3 = getLine3()
  const line4 = getLine4()
  const line5 = getLine5()
  const line6 = getLine6()
  const line7 = getLine7()
  const line8 = getLine8()
  const line9 = getLine9()
  const scatter = getScatter()
  bonus += line1[0][2] + line1[1][2]
  bonus += line2[0][2] + line2[1][2]
  bonus += line3[0][2] + line3[1][2]
  bonus += line4[0][2] + line4[1][2]
  bonus += line5[0][2] + line5[1][2]
  bonus += line6[0][2] + line6[1][2]
  bonus += line7[0][2] + line7[1][2]
  bonus += line8[0][2] + line8[1][2]
  bonus += line9[0][2] + line9[1][2]
  bonus += scatter[0][2] + scatter[1][2]
  
  /* if(bonus > 0){
    console.log(table)
    console.log('LINE1:', line1)
    console.log('LINE2:', line2)
    console.log('LINE3:', line3)
    console.log('LINE4:', line4)
    console.log('LINE5:', line5)
    console.log('LINE6:', line6)
    console.log('LINE7:', line7)
    console.log('LINE8:', line8)
    console.log('LINE9:', line9)
    console.log('SCATTER:', scatter)
    console.log(bonus)
  } */

  return bonus
}


