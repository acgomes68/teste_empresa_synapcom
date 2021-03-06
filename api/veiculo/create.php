<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
// instantiate product object
include_once '../objects/veiculo.php';
 
$database = new Database();
$db = $database->getConnection();
 
$product = new Veiculo($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$product->nome = $data->nome;
$product->id_marca = $data->id_marca;
$product->ano = $data->ano;
$product->descricao = $data->descricao;
$product->vendido = $data->vendido;

// create the product
if($product->create()){
    echo '{';
        echo '"message": "Veiculo was created."';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create veiculo."';
    echo '}';
}
?>
