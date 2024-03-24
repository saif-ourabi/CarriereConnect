<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  exit;
}

require_once "connexion.php";
require "user.php";

class updateOffre
{
  private $connex;

  public function __construct()
  {
    $obj = new Connexion();
    $this->connex = $obj->getConnexion();
  }

  public function update()
  {
    $json_data = file_get_contents("php://input");
    $offre = json_decode($json_data, true);
    if(!isset($offre["id"])){
      header('Content-Type: application/json');
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      echo json_encode(["error" => "ID is missing"]);
      exit();
    }
    $id=$offre["id"];
    $Experience=$offre["Experience"];
    $Salaire=$offre["Salaire"];
    $date=$offre["date_exp"];
    $description=$offre["description"];
    $sql = "UPDATE `offre`
    SET `saliare` = $Salaire,
    `experience` = $Experience,
    `date_exp` = '$date',
    `description` ='$description'
    WHERE `offre`.`id_offre` = $id";
    $res = $this->connex->exec($sql);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    echo json_encode(["success" => true]);
    exit();
}
}


$deleteOffre = new updateOffre();
$deleteOffre->update();
