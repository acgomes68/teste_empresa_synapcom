$(document).ready(function(){
 
    // when a 'search products' button was clicked
    $(document).on('submit', '#search-form', function(){
 
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
 
        // get data from the api based on search keywords
        $.getJSON($http_post + "veiculo/search.php?s=" + keywords, function(data){
 
            // template in products.js
            readTemplate(data, keywords);
 
            // chage page title
            changePageTitle("Pesquisa de Ve&iacute;culos: " + keywords);
 
        });
 
        // prevent whole page reload
        return false;
    });
 
});