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
    const right = getRightSideResult(line)
    if(right[2] > left[2]){
      return right
    }
    return left
  }

  const getLeftSideResult = (line) => {
    if(line[0] != line[1])  return [1, line[0], config.defaultPaytable[0][line[0]]]
    if(line[0] != line[2])  return [2, line[0], config.defaultPaytable[1][line[0]]]
    if(line[0] != line[3])  return [3, line[0], config.defaultPaytable[2][line[0]]]
    if(line[0] != line[4])  return [4, line[0], config.defaultPaytable[3][line[0]]]
    return [5, line[0], config.defaultPaytable[4][line[0]]]
  }

  const getRightSideResult = (line) => {
    if(line[4] != line[3])  return [1, line[4], config.defaultPaytable[0][line[4]]]
    if(line[4] != line[2])  return [2, line[4], config.defaultPaytable[1][line[4]]]
    if(line[4] != line[1])  return [3, line[4], config.defaultPaytable[2][line[4]]]
    if(line[4] != line[0])  return [4, line[4], config.defaultPaytable[3][line[4]]]
    return [5, line[4], config.defaultPaytable[4][line[4]]]
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
  bonus += line1[2]
  bonus += line2[2]
  bonus += line3[2]
  bonus += line4[2]
  bonus += line5[2]
  bonus += line6[2]
  bonus += line7[2]
  bonus += line8[2]
  bonus += line9[2]
  
  /*if(bonus > 0){
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
    console.log(bonus)
  }*/

  return bonus
}


