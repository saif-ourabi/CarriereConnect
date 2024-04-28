<?php
require_once "connexion.php";
require "./offre.php";

class addOffer
{
  private $connex;

  public function __construct()
  {
    $obj = new Connexion();
    $this->connex = $obj->getConnexion();
  }

  public function addOffer()
  {

    $json_data = file_get_contents("php://input");
    $offer_data = json_decode($json_data, true);

    if ($offer_data) {
      $Salaire = htmlspecialchars($offer_data['Salaire']);
      $Experience = htmlspecialchars($offer_data['Experience']);
      $date_exp = htmlspecialchars($offer_data['date_exp']);
      $description = htmlspecialchars($offer_data['description']);
      $offer = new offre($Salaire, $Experience, $date_exp, $description);
      $sql = "INSERT INTO offre (id_offre,saliare,experience,date_exp,description) VALUES
            (NULL,{$offer->__get("salaire")},
             '{$offer->__get("experience")}',
             '{$offer->__get("date_exp")}',
             '{$offer->__get("description")}')";

      $res=$this->connex->exec($sql);
      if($res==1){
      echo json_encode(true);
      }
      else{
        echo json_encode(false);
      }

    }
  }
}

$addoffer = new addOffer();
$addoffer->addOffer();
