<?php

require_once "../../../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
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

    $key = "b605f5b6d783bd077d05de9373c4b08e";
    $json_data = file_get_contents("php://input");
    $jwt_token = json_decode($json_data,true);
    $decoded = JWT::decode($jwt_token["jwt_token"], new Key($key, 'HS256'));
    $decoded=(array)$decoded;
    $userid=$decoded["sub"];
    if(!isset($userid)){
      header('Content-Type: application/json');
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
      header("Access-Control-Allow-Headers: Content-Type, Authorization");
      echo json_encode(false);
      exit();
    }
    $sql = "SELECT * FROM user where id_user=$userid";
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
