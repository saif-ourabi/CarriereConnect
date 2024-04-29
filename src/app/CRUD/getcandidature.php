<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
require_once "connexion.php";
require "user.php";
require_once "../../../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
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
    $key = "b605f5b6d783bd077d05de9373c4b08e";
    $json_data = file_get_contents("php://input");
    $jwt_token = json_decode($json_data,true);
    $decoded = JWT::decode($jwt_token["jwt_token"], new Key($key, 'HS256'));
    $decoded=(array)$decoded;
    $id=$decoded["sub"];
    $sql = "SELECT * FROM candidature where id_user=$id";
    $res = $this->connex->query($sql);
    $res = $res->fetchAll(PDO::FETCH_ASSOC);
    if(!empty($res)){
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");
    echo json_encode($res);
    }
    else{
        header('Content-Type: application/json');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Content-Type: application/json");
        echo json_encode("err");
    }
}
}


$getcandidature = new candidature();
$getcandidature->getcandidature();
