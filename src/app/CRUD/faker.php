<?php
require "connexion.php";
require "offre.php";
$connexion=new connexion();
$pdo=$connexion->getConnexion();
for($i=0;$i<50;$i++){
    $offre=new offre(100*$i,"$i","2024-01-22");
    $sql="INSERT INTO offre (`id_offre`, `saliare`, `experience`, `date_exp`) VALUES 
                            (NULL, {$offre->__get("salaire")}, 
                                   {$offre->__get("experience")}, 
                                   '{$offre->__get("date_exp")}');";
    $pdo->exec($sql);
}





?>