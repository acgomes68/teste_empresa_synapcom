<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../config/database.php';
include_once '../objects/marca.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$marca = new Marca($db);
 
// query products
$stmt = $marca->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){
 
    // products array
    $marcas_arr=array();
    $marcas_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
        
        $marca_item=array(
            "id" => $id,
            "nome" => $nome,
            "created_at" => $created_at,
            "updated_at" => $updated_at
        );
 
        array_push($marcas_arr["records"], $marca_item);
    }
 
    echo json_encode($marcas_arr);
}
 
else{
    echo json_encode(
        array("message" => "No veiculo found.")
    );
}
?>
