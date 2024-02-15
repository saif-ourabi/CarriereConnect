<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  exit;
}

require_once "connexion.php";
require "user.php";

class deleteOffre
{
  private $connex;

  public function __construct()
  {
    $obj = new Connexion();
    $this->connex = $obj->getConnexion();
  }

  public function delete()
  {
    $json_data = file_get_contents("php://input");
    $offreid = json_decode($json_data, true);
    if(!isset($offreid["id"])){
      header('Content-Type: application/json');
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      echo json_encode(false);
      exit();
    }
    $id=$offreid["id"];
    $sql = "DELETE FROM offre WHERE id_offre=$id";
    $res = $this->connex->exec($sql);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    echo json_encode($res);
    

}
}


$deleteOffre = new deleteOffre();
$deleteOffre->delete();
