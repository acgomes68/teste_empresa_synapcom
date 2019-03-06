<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/veiculo.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$veiculo = new Veiculo($db);
 
// set ID property of product to be edited
$veiculo->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$veiculo->readOne();
 
// create array
$veiculo_arr = array(
    "id" =>  $veiculo->id,
    "nome" => $veiculo->nome,
    "id_marca" => $veiculo->id_marca,
    "marca" => $veiculo->marca,
    "ano" => $veiculo->ano,
    "descricao" => $veiculo->descricao,
    "vendido" => $veiculo->vendido,
    "created_at" => $veiculo->created_at,
    "updated_at" => $veiculo->updated_at
 
);
 
// make it json format
print_r(json_encode($veiculo_arr));
?>
