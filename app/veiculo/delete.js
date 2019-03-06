$(document).ready(function(){
 
    // will run if the delete button was clicked
   $(document).on('click', '.delete-button', function(){
		// get the product id
		var product_id = $(this).attr('data-id');
		
		// bootbox for good looking 'confirm pop up'
		bootbox.confirm({
		 
		    message: "<h4>Confirma a exclus&atilde;o?</h4>",
		    buttons: {
		        confirm: {
		            label: '<span class="glyphicon glyphicon-ok"></span> Sim',
		            className: 'btn-danger'
		        },
		        cancel: {
		            label: '<span class="glyphicon glyphicon-remove"></span> N&atilde;o',
		            className: 'btn-primary'
		        }
		    },
		    callback: function (result) {
		    	
				if(result==true){
				 
				    // send delete request to api / remote server
				    $.ajax({
				        url: $http_post + "veiculo/delete.php",
				        type : "POST",
				        dataType : 'json',
				        data : JSON.stringify({ id: product_id }),
				        success : function(result) {
				 
				            // re-load list of products
				            //show();
				            showFirstPage();
				        },
				        error: function(xhr, resp, text) {
				            console.log(xhr, resp, text);
				        }
				    });
				 
				}
						    	
		    }
		});
				
	});
	
});
