// product list html
function readTemplate(data, keywords){

    var read_html="";

    // search products form
    read_html+="<form id='search-form' action='#' method='post'>";
    read_html+="<div class='input-group pull-left w-30-pct'>";
 
        read_html+="<input type='text' value=\"" + keywords + "\" name='keywords' class='form-control search-keywords' placeholder='Pesquisar ve&iacute;culos...' />";
 
        read_html+="<span class='input-group-btn'>";
            read_html+="<button type='submit' class='btn btn-default' type='button'>";
                read_html+="<span class='glyphicon glyphicon-search'></span>";
            read_html+="</button>";
        read_html+="</span>";
 
    read_html+="</div>";
    read_html+="</form>";
	    
    // when clicked, it will load the create product form
    read_html+="<div id='create' class='btn btn-primary pull-right m-b-15px create-button'>";
        read_html+="<span class='glyphicon glyphicon-plus'></span> Novo Ve&iacute;culo";
    read_html+="</div>";
 
 	
 	 read_html+="<div style='height: 355px;'>";
 	  
    // start table
    read_html+="<table class='table table-bordered table-hover'>";
 
        // creating our table heading
 		read_html+="<tr>";
			read_html+="<th class='w-25-pct text-align-center'>Nome</th>";
			read_html+="<th class='w-10-pct text-align-center'>Marca</th>";
			read_html+="<th class='w-10-pct text-align-center'>Ano</th>";
			read_html+="<th class='w-5-pct text-align-center'>Vendido</th>";
			read_html+="<th class='w-25-pct text-align-center'>A&ccedil;&otilde;es</th>";
		read_html+="</tr>";

    // loop through returned list of data
    $.each(data.records, function(key, val) {
 
        // creating new table row per record
        read_html+="<tr>";
 
	 	      read_html+="<td>" + val.nome + "</td>";
		      read_html+="<td>" + val.marca + "</td>";
		      read_html+="<td class='text-align-center'>" + val.ano + "</td>";
		      read_html+="<td class='text-align-center'>" + (val.vendido == 1 ? "Sim" : "N&atilde;o") + "</td>";

            // 'action' buttons
            read_html+="<td class='text-align-center'>";
                // read product button
                read_html+="<button class='btn btn-primary m-r-10px read-one-button' data-id='" + val.id + "'>";
                    read_html+="<span class='glyphicon glyphicon-eye-open'></span> Exibir";
                read_html+="</button>";
 
                // edit button
                read_html+="<button class='btn btn-info m-r-10px update-button' data-id='" + val.id + "'>";
                    read_html+="<span class='glyphicon glyphicon-edit'></span> Editar";
                read_html+="</button>";
 
                // delete button
                read_html+="<button class='btn btn-danger delete-button' data-id='" + val.id + "'>";
                    read_html+="<span class='glyphicon glyphicon-remove'></span> Excluir";
                read_html+="</button>";
            read_html+="</td>";
 
        read_html+="</tr>";
 
    });
 
    // end table
    read_html+="</table>";
    
    read_html+="</div>";
 
	// pagination
	if(data.paging){
	    read_html+="<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
	 
	        // first page
	        if(data.paging.first!=""){
	            read_html+="<li><a data-page='" + data.paging.first + "'>Primeira P&aacute;gina</a></li>";
	        }
	 
	        // loop through pages
	        $.each(data.paging.pages, function(key, val){
	            var active_page=val.current_page=="yes" ? "class='active'" : "";
	            read_html+="<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
	        });
	 
	        // last page
	        if(data.paging.last!=""){
	            read_html+="<li><a data-page='" + data.paging.last + "'>&Uacute;ltima P&aacute;gina</a></li>";
	        }
	    read_html+="</ul>";
	}
	 
    // inject to 'page-content' of our app
    $("#page-content").html(read_html);
}