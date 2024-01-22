<?php
class offre{
    private $id_offre ;
    private $salaire;
    private $experience;
    private $date_exp;

   
    public function __construct($s,$ex,$dat)
    {
        $this->salaire=$s;
        $this->experience=$ex;
        $this->date_exp=$dat;
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