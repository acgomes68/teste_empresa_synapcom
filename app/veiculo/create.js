$(document).ready(function(){
 
    // show html form when 'create' button was clicked
    $(document).on('click', '.create-button', function(){

		// load list of marcas
		$.getJSON($http_post + "marca/read.php", function(data){

			// build marcas option html
			// loop through returned list of data
			var marcas_options_html="";
			marcas_options_html+="<select name='id_marca' class='form-control'>";
			marcas_options_html+="<option value='0'>Selecione</option>";
			$.each(data.records, function(key, val){
			    marcas_options_html+="<option value='" + val.id + "'>" + val.nome + "</option>";
			});
			marcas_options_html+="</select>";
			
			// we have our html form here where product information will be entered
			// we used the 'required' html5 property to prevent empty fields
			var create_html="";
			 
			// 'read' button to show list of veiculos
			create_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
			create_html+="<span class='glyphicon glyphicon-list'></span> Listagem de Ve&iacute;culos";
			create_html+="</div>";
			
			// 'create' html form
			create_html+="<form id='create-form' action='#' method='post' border='0'>";
			    create_html+="<table class='table table-hover table-responsive table-bordered'>";
			 
			        // name field
			        create_html+="<tr>";
			            create_html+="<td>Nome</td>";
			            create_html+="<td><input type='text' name='nome' class='form-control' required /></td>";
			        create_html+="</tr>";
			 
			        // categories 'select' field
			        create_html+="<tr>";
			            create_html+="<td>Marca</td>";
			            create_html+="<td>" + marcas_options_html + "</td>";
			        create_html+="</tr>";
			 
			        // price field
			        create_html+="<tr>";
			            create_html+="<td>Ano</td>";
			            create_html+="<td><input type='number' min='1980' name='ano' class='form-control' /></td>";
			        create_html+="</tr>";
			 
			        // description field
			        create_html+="<tr>";
			            create_html+="<td>Descri&ccedil;&atilde;o</td>";
			            create_html+="<td><textarea name='descricao' class='form-control'></textarea></td>";
			        create_html+="</tr>";

			        // price field
			        create_html+="<tr>";
			            create_html+="<td>Vendido</td>";
			            create_html+="<td><select name='vendido' class='form-control'>";
			            create_html+="<option value=''>Selecione</option>";
			            create_html+="<option value='0'>N&atilde;o</option>";
			            create_html+="<option value='1'>Sim</option>";
			        		create_html+="</tr>";
			 
			        // button to submit form
			        create_html+="<tr>";
			            create_html+="<td></td>";
			            create_html+="<td>";
			                create_html+="<button type='submit' class='btn btn-primary'>";
			                    create_html+="<span class='glyphicon glyphicon-plus'></span> Salvar";
			                create_html+="</button>";
			            create_html+="</td>";
			        create_html+="</tr>";
			 
			   create_html+="</table>";
				create_html+="</form>";	
				
				// inject html to 'page-content' of our app
				$("#page-content").html(create_html);
				 
				// chage page title
				changePageTitle("Novo Veículo");						
					 
		});
		
    });
 
	// will run if create product form was submitted
	$(document).on('submit', '#create-form', function(){
		// get form data
		var form_data=JSON.stringify($(this).serializeObject());
		
 		// submit form data to api
		$.ajax({
		    url: $http_post + "veiculo/create.php",
		    type : "POST",
		    contentType : 'application/json',
		    data : form_data,
		    success : function(result) {
		        // product was created, go back to products list
		        show();
		    },
		    error: function(xhr, resp, text) {
		        // show error to console
		        console.log(xhr, resp, text);
		    }
		});
	});

	return false;	
	    
});
