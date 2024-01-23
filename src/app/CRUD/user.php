<?php
class user{
    private $id_user ;
    private $nom;
    private $prenom;
    private $password;
    private $email;
    private $cin;
    private $role="user";
    private $cv;

   
    public function __construct($n,$p,$pass,$e,$c)
    {
        $this->nom=$n;
        $this->prenom=$p;
        $this->password=$pass;
        $this->email=$e;
        $this->cin=$c;
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