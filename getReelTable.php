<?php
set_time_limit(0);
require("configs/{$_POST['gameType']}.php");

$gameTable = new $config['gameTable']();
$payline = new $config['payline']($config['paytable']);
$gameTable->run($_POST['reelTable'], $payline);

?>