<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  exit;
}

require_once "connexion.php";
require "user.php";

class getUtilisateurinfo
{
  private $connex;

  public function __construct()
  {
    $obj = new Connexion();
    $this->connex = $obj->getConnexion();
  }

  public function getUtilisateurinfo()
  {
    $json_data = file_get_contents("php://input");
    $userid = json_decode($json_data, true);
    if(!isset($userid["id"])){
      header('Content-Type: application/json');
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      echo json_encode(false);
      exit();
    }
    $id=$userid["id"];
    $sql = "SELECT * FROM user where id_user=$id";
    $res = $this->connex->query($sql);
    $res = $res->fetch(PDO::FETCH_ASSOC);
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    echo json_encode($res);
    

}
}


$getUtilisateurinfo = new getUtilisateurinfo();
$getUtilisateurinfo->getUtilisateurinfo();
