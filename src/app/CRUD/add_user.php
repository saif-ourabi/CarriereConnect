<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit;
}

require_once "connexion.php";
require "user.php";

class AddUser
{
    private $connex;

    public function __construct()
    {
        $obj = new Connexion();
        $this->connex = $obj->getConnexion();
    }

    public function addUser()
    {

        $json_data = file_get_contents("php://input");
        $user_data = json_decode($json_data, true);

        if ($user_data && isset($user_data['cin'])) {
            $cin = htmlspecialchars($user_data['cin']);
            $email=htmlspecialchars($user_data['email']);
            $sql = "SELECT * FROM user WHERE cin=$cin OR email='$email'";
            $res = $this->connex->query($sql);
            $res = $res->fetchAll(PDO::FETCH_ASSOC);

            if (empty($res)) {
                $user = new User(
                    $user_data['nom'],
                    $user_data['prenom'],
                    md5($user_data['password']),
                    $user_data['email'],
                    $user_data['cin']
                );

                $sql = "INSERT INTO user (id_user, nom, prenom, password, email, cin, role) VALUES 
                    (NULL, 
                    '{$user->__get("nom")}', 
                    '{$user->__get("prenom")}', 
                    '{$user->__get("password")}', 
                    '{$user->__get("email")}', 
                    '{$user->__get("cin")}',
                    'user');";

                $this->connex->exec($sql);

                header("Access-Control-Allow-Origin: *");
                header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
                header("Access-Control-Allow-Headers: Content-Type, Authorization");

                $response = array('status' => true, 'message' => 'User registered successfully');
                echo json_encode($response);
            } else {
                header("Access-Control-Allow-Origin: *");
                header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
                header("Access-Control-Allow-Headers: Content-Type, Authorization");

                $response = array('status' => false, 'message' => 'User exists in the database');
                echo json_encode($response);
            }
        }
    }
}

$addUser = new AddUser();
$addUser->addUser();
?>
