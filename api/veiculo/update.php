<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/veiculo.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$veiculo = new Veiculo($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
$veiculo->id = $data->id;
 
// set product property values
$veiculo->nome = $data->nome;
$veiculo->id_marca = $data->id_marca;
$veiculo->ano = $data->ano;
$veiculo->descricao = $data->descricao;
$veiculo->vendido = $data->vendido;

// update the product
if($veiculo->update()){
    echo '{';
        echo '"message": "Veiculo was updated."';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update veiculo."';
    echo '}';
}
?>
