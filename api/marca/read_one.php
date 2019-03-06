<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/marca.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$marca = new Marca($db);
 
// set ID property of product to be edited
$marca->id = isset($_GET['id']) ? $_GET['id'] : die();
 
// read the details of product to be edited
$marca->readOne();
 
// create array
$marca_arr = array(
    "id" =>  $marca->id,
    "nome" => $marca->nome,
    "created_at" => $marca->created_at,
    "updated_at" => $marca->updated_at
 
);
 
// make it json format
print_r(json_encode($marca_arr));
?>
