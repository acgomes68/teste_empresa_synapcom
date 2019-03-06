$(document).ready(function(){

    // handle 'read one' button click
    $(document).on('click', '.read-one-button', function(){
       
		// get product id
		var id = $(this).attr('data-id');
		
		// read product record based on given ID
		$.getJSON($http_post + "veiculo/read_one.php?id=" + id, function(data){
			// start html
			var read_one_html="";
			 
			// when clicked, it will show the product's list
			read_one_html+="<div id='read' class='btn btn-primary pull-right m-b-15px read-button'>";
			    read_one_html+="<span class='glyphicon glyphicon-list'></span> Listagem de Ve&iacute;culos";
			read_one_html+="</div>";
			
			// product data will be shown in this table
			read_one_html+="<table class='table table-bordered table-hover'>";
			 
			    // product name
			    read_one_html+="<tr>";
			        read_one_html+="<td class='w-30-pct'>Nome</td>";
			        read_one_html+="<td class='w-70-pct'>" + data.nome + "</td>";
			    read_one_html+="</tr>";
			 
			    // product price
			    read_one_html+="<tr>";
			        read_one_html+="<td>Marca</td>";
			        read_one_html+="<td>" + data.marca + "</td>";
			    read_one_html+="</tr>";
			 
			    // product description
			    read_one_html+="<tr>";
			        read_one_html+="<td>Ano</td>";
			        read_one_html+="<td>" + data.ano + "</td>";
			    read_one_html+="</tr>";
			 
			    // product category name
			    read_one_html+="<tr>";
			        read_one_html+="<td>Descri&ccedil;&atilde;o</td>";
			        read_one_html+="<td>" + data.descricao + "</td>";
			    read_one_html+="</tr>";

			    // product category name
			    read_one_html+="<tr>";
			        read_one_html+="<td>Vendido</td>";
			        read_one_html+="<td>" + (data.vendido == 0 ? 'N&atilde;o' : 'Sim') + "</td>";
			    read_one_html+="</tr>";

			    // product category name
			    read_one_html+="<tr>";
			        read_one_html+="<td>Cria&ccedil;&atilde;o</td>";
			        read_one_html+="<td>" + data.created_at + "</td>";
			    read_one_html+="</tr>";

			    // product category name
			    read_one_html+="<tr>";
			        read_one_html+="<td>Atualiza&ccedil;&atilde;o</td>";
			        read_one_html+="<td>" + (data.updated_at == null ? '' : data.updated_at) + "</td>";
			    read_one_html+="</tr>";
			 
			read_one_html+="</table>";
			
			// inject html to 'page-content' of our app
			$("#page-content").html(read_one_html);
			 
			// chage page title
			changePageTitle("Detalhe do Veículo");								    
		});		
		        
    });
 
});
