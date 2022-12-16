configs['wild_west_gold'] = {
  title: '牛仔',
  lines: lines_40,
  width: 5,
  height: 4,
  scatter: 11,
  wild: 12,
  pay: 40,
  symbols: ['H1','H2','H3','H4','H5','H6','L1','L2','L3','L4','L5','SC','WD'],
  bonusGameTimes: 8,
  defaultPaytable: [
    [0,   0,    0,    0,      0,    0,    0,    0,    0,    0,    0],
    [0,   0,    0,    0,      0,    0,    0,    0,    0,    0,    0],
    [1.5, 1.25, 0.75, 0.5,    0.35, 0.25, 0.15, 0.15, 0.1,  0.1,  0.1],
    [5,   3.75, 2,    1.25,   0.75, 0.5,  0.3,  0.3,  0.25, 0.25, 0.25],
    [20,  12.5, 7.5,  5,      3.75, 2.5,  1.5,  1.5,  1,    1,    1],
  ],
  analyze: analyze_5x4,
  payline: oneWay40Payline,
  freegame: () => {

  }
}