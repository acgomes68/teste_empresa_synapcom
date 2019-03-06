<?php
class Marca{
 
    // database connection and table name
    private $conn;
    private $table_name = "marca";
 
    // object properties
    public $id;
    public $nome;
    public $created_at;
    public $updated_at;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
	// read products
	function read(){
	 
	    // select all query
	    $query = "SELECT
	                v.id, v.nome, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
	            ORDER BY
	                v.nome ASC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
	
	// used when filling up the update product form
	function readOne(){
	 
	    // query to read single record
	    $query = "SELECT
	                v.id, v.nome, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
	            WHERE
	                v.id = ?
	            LIMIT
	                0,1";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	 
	    // bind id of product to be updated
	    $stmt->bindParam(1, $this->id);
	 
	    // execute query
	    $stmt->execute();
	 
	    // get retrieved row
	    $row = $stmt->fetch(PDO::FETCH_ASSOC);
	    
	    // set values to object properties
	    $this->nome = $row['nome'];
	    $this->created_at = $row['created_at'];
	    $this->updated_at = $row['updated_at'];
	}
	
}

