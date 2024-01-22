<?php
require_once "connexion.php";

class Gestionoffre
{
    private $connex;

    public function __construct()
    {
        $obj = new connexion();
        $this->connex = $obj->getConnexion();
    }

    public function listerOffre()
    {
        $sql = "SELECT * FROM offre";
        $res = $this->connex->query($sql);
        $res = $res->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        echo json_encode($res);
    }
}

$gestionOffre = new Gestionoffre();
$gestionOffre->listerOffre();
