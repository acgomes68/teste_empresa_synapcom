$(document).ready(function(){
 
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-button', function(){
    	
		// get product id
		var id = $(this).attr('data-id');
		
		// read one record based on given product id
		$.getJSON($http_post + "veiculo/read_one.php?id=" + id, function(data){
		 
			 // values will be used to fill out our form
			 var nome = data.nome;
			 var id_marca = data.id_marca;
			 var ano = data.ano;
			 var descricao = data.descricao;
			 var vendido = data.vendido;
		     
			// load list of categories
			$.getJSON($http_post + "marca/read.php", function(data){
				
			    // build 'categories option' html
			    // loop through returned list of data
			    var marcas_options_html="";
			    marcas_options_html+="<select name='id_marca' class='form-control'>";
			    marcas_options_html+="<option value='0' selected>Selecione</option>";
			 
			    $.each(data.records, function(key, val){
			         
			        // pre-select option is category id is the same
			        if(val.id==id_marca){
			            marcas_options_html+="<option value='" + val.id + "' selected>" + val.nome + "</option>";
			        }
			        else{
			            marcas_options_html+="<option value='" + val.id + "'>" + val.nome + "</option>";
			        }
			    });
			    marcas_options_html+="</select>";

				// store 'update product' html to this variable
				var update_html="";
				 
				// 'read products' button to show list of products
				update_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
				    update_html+="<span class='glyphicon glyphicon-list'></span> Listagem de Ve&iacute;culos";
				update_html+="</div>";
				
				// build 'update product' html form
				// we used the 'required' html5 property to prevent empty fields
				update_html+="<form id='update-form' action='#' method='post' border='0'>";
				    update_html+="<table class='table table-hover table-responsive table-bordered'>";
				 
				        // name field
				        update_html+="<tr>";
				            update_html+="<td>Nome</td>";
				            update_html+="<td><input value=\"" + nome + "\" type='text' name='nome' class='form-control' required /></td>";
				        update_html+="</tr>";

				        // categories 'select' field
				        update_html+="<tr>";
				            update_html+="<td>Marca</td>";
				            update_html+="<td>" + marcas_options_html + "</td>";
				        update_html+="</tr>";
				 
				        // price field
				        update_html+="<tr>";
				            update_html+="<td>Ano</td>";
				            update_html+="<td><input value=\"" + ano + "\" type='number' min='1980' name='ano' class='form-control' /></td>";
				        update_html+="</tr>";
				 
				        // description field
				        update_html+="<tr>";
				            update_html+="<td>Descri&ccedil;&atilde;o</td>";
				            update_html+="<td><textarea name='descricao' class='form-control'>" + descricao + "</textarea></td>";
				        update_html+="</tr>";

				        // price field
				        update_html+="<tr>";
				        		update_html+="<td>Vendido</td>";
				        		update_html+="<td><select name='vendido' class='form-control'>";
				        		update_html+="<option value=''>Selecione</option>";
				        		
					        	update_html+="<option value='0'";
					        	update_html+=(vendido == 0 ? 'selected' : '');
					        	update_html+=">N&atilde;o</option>";
	
					        	update_html+="<option value='1'";
					        	update_html+=(vendido == 1 ? 'selected' : '');
					        	update_html+=">Sim</option>";
					        	update_html+="</select></td>";
				        update_html+="</tr>";
				 
				        update_html+="<tr>";
				 
				            // hidden 'product id' to identify which record to delete
				            update_html+="<td><input value=\"" + id + "\" name='id' type='hidden' /></td>";
				 
				            // button to submit form
				            update_html+="<td>";
				                update_html+="<button type='submit' class='btn btn-info'>";
				                    update_html+="<span class='glyphicon glyphicon-edit'></span> Salvar";
				                update_html+="</button>";
				            update_html+="</td>";
				 
				        update_html+="</tr>";
				 
				    update_html+="</table>";
				update_html+="</form>";
				
				// inject to 'page-content' of our app
				$("#page-content").html(update_html);
				 
				// change page title
				changePageTitle("Edição do Veículo");
												
			});
					    
		});
		
		// will run if 'create product' form was submitted
		$(document).on('submit', '#update-form', function(){
			
			// get form data
			var form_data=JSON.stringify($(this).serializeObject());
			
			// submit form data to api
			$.ajax({
			    url: $http_post + "veiculo/update.php",
			    type : "POST",
			    contentType : 'application/json',
			    data : form_data,
			    success : function(result) {
			        // product was created, go back to products list
			        //show();
			        showFirstPage();
			    },
			    error: function(xhr, resp, text) {
			        // show error to console
			        console.log(xhr, resp, text);
			    }
			});
					     
		    return false;
		});
		
    });
});
