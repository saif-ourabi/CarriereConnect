<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  exit;
}

require_once "connexion.php";
require "user.php";

class candidature
{
  private $connex;

  public function __construct()
  {
    $obj = new Connexion();
    $this->connex = $obj->getConnexion();
  }

  public function getcandidature()
  {
    $json_data = file_get_contents("php://input");
    $userid = json_decode($json_data, true);
    $id=$userid["id"];
    $sql = "SELECT * FROM candidature where id_user=$id";
    $res = $this->connex->query($sql);
    $res = $res->fetchAll(PDO::FETCH_ASSOC);
    if(!empty($res)){
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    echo json_encode($res);
    }
    else{
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        echo json_encode("err");
    }
}
}


$getcandidature = new candidature();
$getcandidature->getcandidature();
