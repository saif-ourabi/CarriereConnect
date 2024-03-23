<?php
require "connexion.php";
require "offre.php";

$connexion = new connexion();
$pdo = $connexion->getConnexion();

for ($i = 0; $i < 150; $i++) {
    $offre = new offre(100 * $i, "$i", "2025-01-22", "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe rerum nisi deserunt aspernatur ea error temporibus modi quibusdam culpa natus maiores cupiditate ab eos est, illo officiis pariatur cum sed");
    $sql = "INSERT INTO offre (id_offre,saliare,experience,date_exp,description) VALUES
            (NULL,{$offre->__get("salaire")},
             '{$offre->__get("experience")}',
             '{$offre->__get("date_exp")}',
             '{$offre->__get("description")}')";

    $pdo->exec($sql);
}
?>
