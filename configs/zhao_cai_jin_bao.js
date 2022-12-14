configs['zhao_cai_jin_bao'] = {
  title: '招財進寶',
  width: 5,
  height: 3,
  scatter: 10,
  wild: 11,
  pay: 9,
  symbols: ['H1','H2','H3','H4','L1','L2','L3','L4','L5','L6','SC','WD'],
  defaultPaytable: [
    [2,     0,    0,    0,    0,    0,    0,    0,    0,    0,    0],
    [10,    5,    3,    3,    0,    0,    0,    0,    0,    0,    1],
    [100,   50,   20,   20,   10,   5,    5,    5,    5,    5,    5],
    [500,   250,  100,  100,  30,   25,   20,   20,   15,   15,   10],
    [5000,  2500, 1000, 1000, 500,  300,  200,  200,  100,  100,  100],
  ],
  analyze: analyze_5x3,
  payline: twoWay9Payline,
}