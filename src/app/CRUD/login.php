<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

require_once "connexion.php";
require "user.php";

class login
{
    private $connex;

    public function __construct()
    {
        $obj = new Connexion();
        $this->connex = $obj->getConnexion();
    }

    public function login()
    {

        $json_data = file_get_contents("php://input");
        $user_data = json_decode($json_data, true);
        if (isset($user_data['password']) && isset($user_data['email'])) {
            $email = htmlspecialchars($user_data['email']);
            $sql = "SELECT * FROM user WHERE email='$email'";
            $res = $this->connex->query($sql);
            $res = $res->fetchAll(PDO::FETCH_ASSOC);
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            if (!empty($res)&& md5($user_data["password"])==$res[0]["password"]) {    
                $response = array('status' => true, 'message' => 'corect info');
                echo json_encode($response);
            } else {
                header("Access-Control-Allow-Origin: *");
                header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
                header("Access-Control-Allow-Headers: Content-Type, Authorization");
                $response = array('status' => false, 'message' => 'wrong info');
                echo json_encode($response);
            }
        }
    }
}

$login = new login();
$login->login();
?>
