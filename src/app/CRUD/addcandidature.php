<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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

    public function postule()
    {
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);
        $nom = $data["nom"];
        $prenom = $data["prenom"];
        $cin = $data["cin"];
        $email = $data["email"];
        $id_user = $data["id_user"];
        $id_offre = $data["id_offre"];
        $cv = $data["cv"];
        $sql = "SELECT * FROM offre WHERE id_offre=$id_offre";
        $resof = $this->connex->query($sql);
        $resof = $resof->fetch(PDO::FETCH_ASSOC);
        $datpost = date("Y-m-d");
        if (strtotime($resof["date_exp"]) >= strtotime($datpost)) {
            $sql = "INSERT INTO candidature VALUES (NUll,'$id_offre','$datpost','$id_user','$nom','$prenom','$cv','$cin','$email');";
            try {
                $res = $this->connex->exec($sql);
                header("Content-Type: application/json");
                echo json_encode(["state" => true, "message" => "Candidature successfully added"]);
            } catch (Exception $e) {
                header("Content-Type: application/json");
                echo json_encode(["state" => false, "message" => "Database error"]);
            }
        }
        else{
            header("Content-Type: application/json");
            echo json_encode(["state" => false, "message" => "Offer expired"]);
        }
    }
}

$candidature = new candidature();
$candidature->postule();
?>
