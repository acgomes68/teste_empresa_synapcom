<?php
class Veiculo{
 
    // database connection and table name
    private $conn;
    private $table_name = "veiculo";
 
    // object properties
    public $id;
    public $nome;
    public $id_marca;
    public $ano;
    public $descricao;
    public $vendido;
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
	                v.id, v.nome, v.id_marca, m.nome AS marca, v.ano, v.descricao, v.vendido, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
                LEFT JOIN
                    marca m
                        ON v.id_marca = m.id
	            ORDER BY
	                v.nome ASC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
	
	// create product
	function create(){
	 
	    // query to insert record
	    $query = "INSERT INTO
	                " . $this->table_name . "
	            SET
	                nome=:nome, id_marca=:id_marca, ano=:ano, descricao=:descricao, vendido=:vendido";
	 
	    // prepare query
	    $stmt = $this->conn->prepare($query);
	    
	    // sanitize
	    $this->nome=htmlspecialchars(strip_tags($this->nome));
	    $this->id_marca=htmlspecialchars(strip_tags($this->id_marca));
	    $this->ano=htmlspecialchars(strip_tags($this->ano));
	    $this->descricao=htmlspecialchars(strip_tags($this->descricao));
	    $this->vendido=htmlspecialchars(strip_tags($this->vendido));
	 
	    // bind values
	    $stmt->bindParam(":nome", $this->nome);
	    $stmt->bindParam(":id_marca", $this->id_marca);
	    $stmt->bindParam(":ano", $this->ano);
	    $stmt->bindParam(":descricao", $this->descricao);
	    $stmt->bindParam(":vendido", $this->vendido);
	 
	    // execute query
	    if($stmt->execute()){
	        return true;
	    }
	 
	    return false;
	     
	}
	
	// used when filling up the update product form
	function readOne(){
	 
	    // query to read single record
	    $query = "SELECT
	                v.id, v.nome, v.id_marca, m.nome AS marca, v.ano, v.descricao, v.vendido, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
               LEFT JOIN
                   marca m
                   	ON v.id_marca = m.id
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
	    $this->id_marca = $row['id_marca'];
	    $this->marca = $row['marca'];
	    $this->ano = $row['ano'];
	    $this->descricao = $row['descricao'];
	    $this->vendido = $row['vendido'];
	    $this->created_at = $row['created_at'];
	    $this->updated_at = $row['updated_at'];
	}
	
	// update the product
	function update(){
	 
	    // update query
	    $query = "UPDATE
	                " . $this->table_name . "
	            SET
	                nome = :nome,
	                id_marca = :id_marca,
	                ano = :ano,
	                descricao = :descricao,
	                vendido = :vendido
	            WHERE
	                id = :id";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // sanitize
	    $this->nome=htmlspecialchars(strip_tags($this->nome));
	    $this->id_marca=htmlspecialchars(strip_tags($this->id_marca));
	    $this->ano=htmlspecialchars(strip_tags($this->ano));
	    $this->descricao=htmlspecialchars(strip_tags($this->descricao));
	    $this->vendido=htmlspecialchars(strip_tags($this->vendido));
	    $this->id=htmlspecialchars(strip_tags($this->id));
	 
	    // bind new values
	    $stmt->bindParam(":nome", $this->nome);
	    $stmt->bindParam(":id_marca", $this->id_marca);
	    $stmt->bindParam(":ano", $this->ano);
	    $stmt->bindParam(":descricao", $this->descricao);
	    $stmt->bindParam(":vendido", $this->vendido);
	    $stmt->bindParam(':id', $this->id);
	 
	    // execute the query
	    if($stmt->execute()){
	        return true;
	    }
	 
	    return false;
	}
	
	// delete the product
	function delete(){
	 
	    // delete query
	    $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
	 
	    // prepare query
	    $stmt = $this->conn->prepare($query);
	 
	    // sanitize
	    $this->id=htmlspecialchars(strip_tags($this->id));
	 
	    // bind id of record to delete
	    $stmt->bindParam(1, $this->id);
	 
	    // execute query
	    if($stmt->execute()){
	        return true;
	    }
	 
	    return false;
	     
	}
	
	// search products
	function search($keywords){
	 
	    // select all query
	    $query = "SELECT
	                v.id, v.nome, v.id_marca, m.nome AS marca, v.ano, v.descricao, v.vendido, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
               LEFT JOIN
                   marca m
                   	ON v.id_marca = m.id
	            WHERE
	                v.nome LIKE ? OR m.nome LIKE ? OR v.descricao LIKE ?
	            ORDER BY
	                v.nome ASC";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare($query);
	 
	    // sanitize
	    $keywords=htmlspecialchars(strip_tags($keywords));
	    $keywords = "%{$keywords}%";
	 
	    // bind
	    $stmt->bindParam(1, $keywords);
	    $stmt->bindParam(2, $keywords);
	    $stmt->bindParam(3, $keywords);
	 
	    // execute query
	    $stmt->execute();
	 
	    return $stmt;
	}
	
	// read products with pagination
	public function readPaging($from_record_num, $records_per_page){
	 
	    // select query
	    $query = "SELECT
	                v.id, v.nome, v.id_marca, m.nome AS marca, v.ano, v.descricao, v.vendido, v.created_at, v.updated_at
	            FROM
	                " . $this->table_name . " v
	            LEFT JOIN
	            	marca m
	               	ON v.id_marca = m.id
	            ORDER BY v.nome ASC
	            LIMIT ?, ?";
	 
	    // prepare query statement
	    $stmt = $this->conn->prepare( $query );
	 
	    // bind variable values
	    $stmt->bindParam(1, $from_record_num, PDO::PARAM_INT);
	    $stmt->bindParam(2, $records_per_page, PDO::PARAM_INT);
	 
	    // execute query
	    $stmt->execute();
	 
	    // return values from database
	    return $stmt;
	}
	
	// used for paging products
	public function count(){
	    $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . "";
	 
	    $stmt = $this->conn->prepare( $query );
	    $stmt->execute();
	    $row = $stmt->fetch(PDO::FETCH_ASSOC);
	 
	    return $row['total_rows'];
	}		 
}

