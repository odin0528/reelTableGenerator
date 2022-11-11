<?php

require_once('gameTable/5x3.php');
require_once('payline/twoWay9Payline.php');

$config = [
  'title' =>  '招財童子',
  'width' =>  5,
  'height' =>  3,
  'symbols'=> ['H1','H2','H3','H4','L1','L2','L3','L4','L5','L6'],
  'paytable' =>  [
    [2,     0,    0,    0,    0,    0,    0,    0,    0,    0],
    [10,    5,    5,    5,    2,    2,    0,    0,    0,    0],
    [50,    25,   20,   20,   10,   10,   5,    5,    3,    3],
    [500,   250,  170,  125,  50,   50,   25,   25,   10,   10],
    [10000, 5000, 1200, 750,  350,  250,  200,  200,  50,   50],
  ],
  'gameTable' =>  'gameTable5x3',
  'payline' =>  'twoWay9Payline',
];
?>