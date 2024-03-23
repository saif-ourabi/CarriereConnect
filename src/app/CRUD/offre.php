<?php
class offre{
    private $id_offre ;
    private $salaire;
    private $experience;
    private $date_exp;
    private $description;


    public function __construct($s,$ex,$dat,$des)
    {
        $this->salaire=$s;
        $this->experience=$ex;
        $this->date_exp=$dat;
        $this->description=$des;
    }

    public function __get($name)
    {
        return $this->$name;
    }

    public function __set($name, $value)
    {
        $this->$name=$value;
    }

}








?>
