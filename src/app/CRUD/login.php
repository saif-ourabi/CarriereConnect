<?php
require_once "connexion.php";
require "user.php";
require_once "../../../vendor/autoload.php";

use Firebase\JWT\JWT;



header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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
        $key ="b605f5b6d783bd077d05de9373c4b08e";
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
                $UserID=$res[0]['id_user'];
                $jwt=generate_jwt_token($UserID,$key);
                $response = array('status' => true, 'message' => 'correct info','token' => $jwt);
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

function generate_jwt_token($user_id, $key) {
    $issued_at = time();
    $expiration_time = $issued_at + (60 * 60);
    $payload = array(
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'sub' => $user_id
    );
    return JWT::encode($payload,$key,'HS256');
}

$login = new login();
$login->login();
?>
