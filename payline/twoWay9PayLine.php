<?php
class twoWay9PayLine {
  public $table;
  public $payTable;
  function __construct($payTable)
  {
    $this->payTable = $payTable;
  }
  function run($table){
    $this->table = $table;

    $bonus = 0.0;
    $line1 = $this->getLine1();
    $line2 = $this->getLine2();
    $line3 = $this->getLine3();
    $line4 = $this->getLine4();
    $line5 = $this->getLine5();
    $line6 = $this->getLine6();
    $line7 = $this->getLine7();
    $line8 = $this->getLine8();
    $line9 = $this->getLine9();
    $bonus += $line1[2];
    $bonus += $line2[2];
    $bonus += $line3[2];
    $bonus += $line4[2];
    $bonus += $line5[2];
    $bonus += $line6[2];
    $bonus += $line7[2];
    $bonus += $line8[2];
    $bonus += $line9[2];
    
    /* if($bonus > 0){
      echo json_encode($table) . "\n";
      echo "line1:" . json_encode($line1) . "\n";
      echo "line2:" . json_encode($line2) . "\n";
      echo "line3:" . json_encode($line3) . "\n";
      echo "line4:" . json_encode($line4) . "\n";
      echo "line5:" . json_encode($line5) . "\n";
      echo "line6:" . json_encode($line6) . "\n";
      echo "line7:" . json_encode($line7) . "\n";
      echo "line8:" . json_encode($line8) . "\n";
      echo "line9:" . json_encode($line9) . "\n";

      var_dump($bonus);
    } */

    return $bonus;
  }

  function getLeftSideResult($line){
    if($line[0] != $line[1])  return [1, $line[0], $this->payTable[0][$line[0]]];
    if($line[0] != $line[2])  return [2, $line[0], $this->payTable[1][$line[0]]];
    if($line[0] != $line[3])  return [3, $line[0], $this->payTable[2][$line[0]]];
    if($line[0] != $line[4])  return [4, $line[0], $this->payTable[3][$line[0]]];
    return [5, $line[0], $this->payTable[4][$line[0]]];
  }

  function getRightSideResult($line){
    if($line[4] != $line[3])  return [1, $line[4], $this->payTable[0][$line[4]]];
    if($line[4] != $line[2])  return [2, $line[4], $this->payTable[1][$line[4]]];
    if($line[4] != $line[1])  return [3, $line[4], $this->payTable[2][$line[4]]];
    if($line[4] != $line[0])  return [4, $line[4], $this->payTable[3][$line[4]]];
    return [5, $line[4], $this->payTable[4][$line[4]]];
  }

  function getLineResult($line){
    $left = $this->getLeftSideResult($line);
    $right = $this->getRightSideResult($line);
    if($right[2] > $left[2]){
      return $right;
    }
    return $left;
  }
  
  function getLine1(){
    $line = [$this->table[0][1],$this->table[1][1],$this->table[2][1],$this->table[3][1],$this->table[4][1]];
    return $this->getLineResult($line);
  }
  
  function getLine2(){
    $line = [$this->table[0][0],$this->table[1][0],$this->table[2][0],$this->table[3][0],$this->table[4][0]];
    return $this->getLineResult($line);
  }
  
  function getLine3(){
    $line = [$this->table[0][2],$this->table[1][2],$this->table[2][2],$this->table[3][2],$this->table[4][2]];
    return $this->getLineResult($line);
  }
  
  function getLine4(){
    $line = [$this->table[0][0],$this->table[1][1],$this->table[2][2],$this->table[3][1],$this->table[4][0]];
    return $this->getLineResult($line);
  }
  
  function getLine5(){
    $line = [$this->table[0][2],$this->table[1][1],$this->table[2][0],$this->table[3][1],$this->table[4][2]];
    return $this->getLineResult($line);
  }
  
  function getLine6(){
    $line = [$this->table[0][0],$this->table[1][0],$this->table[2][1],$this->table[3][0],$this->table[4][0]];
    return $this->getLineResult($line);
  }
  
  function getLine7(){
    $line = [$this->table[0][2],$this->table[1][2],$this->table[2][1],$this->table[3][2],$this->table[4][2]];
    return $this->getLineResult($line);
  }
  
  function getLine8(){
    $line = [$this->table[0][1],$this->table[1][0],$this->table[2][0],$this->table[3][0],$this->table[4][1]];
    return $this->getLineResult($line);
  }
  
  function getLine9(){
    $line = [$this->table[0][1],$this->table[1][2],$this->table[2][2],$this->table[3][2],$this->table[4][1]];
    return $this->getLineResult($line);
  }
}

?>