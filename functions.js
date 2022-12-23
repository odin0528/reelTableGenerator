const changeGameType = () => {
  const gameType = $('#gameType').val();
  config = configs[gameType];
  console.log(config)
  // generatePaytable();
  generateSymbolTable();

  if(config.isFreeGameTable){
    $('#inputFreeGameTable').show()
  }else{
    $('#inputFreeGameTable').hide()
  }

  if($('#inputReelTable').length > 0){
    $('#inputReelTable').val(localStorage.getItem(`${gameType}_reelTable`))
    if(config.isFreeGameTable){
      $('#inputFreeGameTable').val(localStorage.getItem(`${gameType}_freeGameTable`))
    }
  }
}

function generatePaytable(){
  const reelWidth = config.width;
  const symbolNumber = config.symbols.length;
  const enableScatter = config.scatter;
  const enableWild = config.wild;
  const defaultPaytable = config.defaultPaytable;
  const $tableHead =$('#payTable thead');
  const $tableBody =$('#payTable tbody');

  $tableHead.empty();
  $tableBody.empty();
  $tableHead.append('<tr class="row"><th class="col">圖案</th></tr>');
  for(let i = 1; i <= reelWidth; i++){
    $tableHead.find('tr').append(`<th class="col">${i}連線</th>`);
  }

  for(let i = 0; i < symbolNumber; i++){
    let row = `<tr class="row"><td class="col">${config.symbols[i]}</td>`

    for(let j = 0; j < reelWidth; j++){
      row += `<td class="col"><input id="p_${j}_${i}" class="col-8" type="text" value="${defaultPaytable[j][i]}"></td>`
    }

    row += `</tr>`;
    $tableBody.append(row);
  }

  if(enableScatter){
    let row = `<tr class="row"><td class="col">SC</td>`
    for(let i = 1; i <= reelWidth; i++){
      row += `<td class="col"><input class="col-8" type="text" value="0"></td>`
    }
    row += `</tr>`;
    $tableBody.append(row);
  }

  if(enableWild){
    let row = `<tr class="row"><td class="col">WD</td>`
    for(let i = 1; i <= reelWidth; i++){
      row += `<td class="col"><input class="col-8" type="text" value="0"></td>`
    }
    row += `</tr>`;
    $tableBody.append(row);
  }
}

function generateSymbolTable(){
  const reelWidth = config.width;
  const symbolNumber = config.symbols.length;
  const $tableHead =$('#symbolTable thead');
  const $tableBody =$('#symbolTable tbody');
  const symbolTable = JSON.parse(localStorage.getItem('symbolTable')) || null

  $tableHead.empty();
  $tableBody.empty();
  $tableHead.append('<tr class="row"><th class="col">ID</th><<th class="col">圖案</th></tr>');
  for(let i = 1; i <= reelWidth; i++){
    $tableHead.find('tr').append(`<th class="col">轉輪${i}</th>`);
  }

  for(let i = 0; i < symbolNumber; i++){
    let row = `<tr class="row"><td class="col">${i}</td><td class="col">${config.symbols[i]}</td>`

    for(let j = 0; j < reelWidth; j++){
      const number = symbolTable ? symbolTable[j][i] : 1
      row += `<td class="col"><input id="s_${j}_${i}" class="col-8" type="text" value="${number}"></td>`
    }

    row += `</tr>`;
    $tableBody.append(row);
  }
}

function getReelTable(){
  saveSymbolNumberTable()
  const startAt = Date.now()
  console.error('start at:', startAt)
  const reelWidth = config.width;
  const symbolNumber = config.symbols.length;
  const $symbolTableBody =$('#symbolTable tbody');
  var possibility = 1;
  reelTable = [];
  cycleReelTable = [];

  for(let j = 0; j < reelWidth; j++){
    var symbolCol = [];
    for(let i = 0; i < symbolNumber; i++){
      const symbolAmount = parseInt($symbolTableBody.find(`#s_${j}_${i}`).val())
      for(let x=0; x < symbolAmount; x++){
        symbolCol.push(i);
      }
    }
    shuffle(symbolCol)
    possibility *= symbolCol.length
    reelTable.push(symbolCol)
    cycleReelTable.push([...symbolCol, ...symbolCol.slice(0, config.height-1)])
  }
  $('#reelTable').text(JSON.stringify(reelTable))
  $('#possibility').text(possibility)

  bonusGameTimes = 0
  config.analyze()
  const endAt = Date.now()
  console.error('end at:', Date.now())
  console.error('executing for:', endAt - startAt)
}

function saveSymbolNumberTable(){
  const $symbolTableBody =$('#symbolTable tbody');
  const symbolTable = []
  for(let j = 0; j < config.width; j++){
    var symbolCol = [];
    for(let i = 0; i < config.symbols.length; i++){
      const symbolAmount = parseInt($symbolTableBody.find(`#s_${j}_${i}`).val())
      symbolCol.push(symbolAmount);
    }
    symbolTable.push(symbolCol)
  }
  localStorage.setItem('symbolTable', JSON.stringify(symbolTable))
}

function getRTP(){
  const $paytableBody =$('#payTable tbody');
  const $symbolTableBody =$('#symbolTable tbody');
  const symbolNumber = $('#symbolNumber').val();
  const reelWidth = $('#reelWidth').val();
  let totalSymbol = 0;
  let totalBonus = 0;

  for(let j = 0; j < reelWidth; j++){
    // 先算該轉輪總symbol數
    for(let i = 0; i < symbolNumber; i++){
      totalSymbol += parseInt($symbolTableBody.find(`#s_${j}_${i}`).val())
    }

    // 算該轉輪單個symbol的出現率
    for(let i = 0; i < symbolNumber; i++){
      const showTimes = parseInt($symbolTableBody.find(`#s_${j}_${i}`).val())
      const rate = parseFloat(showTimes / totalSymbol)
      const bonus = showTimes * parseInt($paytableBody.find(`#p_${j}_${i}`).val())
      console.log(`圖案${i} 轉輪${j} 出現機率：${rate.toFixed(4)} 預期賠付：${bonus}`);
      totalBonus += bonus;
    }

  }

  /* for(let i = 0; i < symbolNumber; i++){
    for(let j = 0; j < reelWidth; j++){
      const showTimes = parseInt($symbolTableBody.find(`#s_${j}_${i}`).val())
      const rate = parseFloat(showTimes / totalSymbol)
      const bonus = showTimes * parseInt($paytableBody.find(`#p_${j}_${i}`).val())
      console.log(`圖案${i} 轉輪${j} 出現機率：${rate.toFixed(4)} 預期賠付：${bonus}`);
      totalBonus += bonus;
    }
  } */
  console.log(`預期RTP${totalBonus / totalSymbol * 100}`)
}

function play(times){
  const gameType = $('#gameType').val();
  const inputReelTable = $('#inputReelTable').val();
  const inputFreeGameTable = $('#inputFreeGameTable').val();
  var currentTable = []
  localStorage.setItem(`${gameType}_reelTable`, inputReelTable)
  
  reelTable = JSON.parse(inputReelTable)
  

  cycleReelTable = []
  for(let x = 0 ; x < config.width; x++){
    cycleReelTable.push([...reelTable[x], ...reelTable[x].slice(0, config.height-1)])
  }

  //有free game table的話 就生成free game table
  if(config.isFreeGameTable){
    localStorage.setItem(`${gameType}_freeGameTable`, inputFreeGameTable)
    freeGameTable = JSON.parse(inputFreeGameTable)
    cycleFreeGameTable = []
    for(let x = 0 ; x < config.width; x++){
      cycleFreeGameTable.push([...freeGameTable[x], ...freeGameTable[x].slice(0, config.height-1)])
    }
  }

  for(let i=0 ; i < times; i++){
    currentTable = getRandomTable()
    // var {bonus} = config.payline(currentTable)
    var {bonus, links} = config.payline(currentTable)
    playTimes++
    totalPay += config.pay
    totalReturn += parseFloat(bonus.toFixed(2))
  }
  
  drawCurrentTable(currentTable, links)
  // drawCurrentTable(currentTable, null)

  $('#bonus').text(bonus)
  $('#playTimes').text(playTimes)
  $('#enterFreeGameRate').text((enterFreeGameTimes / playTimes).toFixed(4))
  $('#enterFreeGameTimes').text(enterFreeGameTimes)
  $('#freeGameTimes').text(freeGameTimes)
  $('#totalPay').text(totalPay)
  $('#totalReturn').text(totalReturn.toFixed(2))
  $('#totalRTP').text((totalReturn / totalPay).toFixed(4))
}

function getRandomTable(){
  const currentTable = []
  for(let x = 0 ; x < config.width; x++){
    const index = Math.floor(Math.random() * reelTable[x].length)
    currentTable.push(cycleReelTable[x].slice(index, index + config.height))
  }
  return currentTable
}

function getRandomFreeGameTable(){
  const currentTable = []
  for(let x = 0 ; x < config.width; x++){
    const index = Math.floor(Math.random() * freeGameTable[x].length)
    currentTable.push(cycleFreeGameTable[x].slice(index, index + config.height))
  }
  return currentTable
}

function drawCurrentTable(currentTable, links){
  $('#currentSpin').empty()
  for(let x = 0; x < currentTable.length; x++){
    $('#currentSpin').append('<div class="col"></div>')
    for(let y = 0; y < currentTable[x].length; y++){
      $('#currentSpin div.col:last').append(`<div class="symbol-${currentTable[x][y]}${links&&links[y][x]?' active':' unactive'}">${currentTable[x][y]}</div>`)
      if(currentTable[x][y] === config.wild){
        $('#currentSpin div.col:last div:last').addClass('symbol-wd')
      }
      if(currentTable[x][y] === config.scatter){
        $('#currentSpin div.col:last div:last').addClass('symbol-sc')
      }
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}