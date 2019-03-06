$(document).ready(function(){

    // show list of product on first load
    showFirstPage();
 
    // when a 'read products' button was clicked
    $(document).on('click', '.read-button', function(){
        showFirstPage();
    });
 
    // when a 'page' button was clicked
    $(document).on('click', '.pagination li', function(){
        // get json url
        var json_url=$(this).find('a').attr('data-page');
 
        // show list of products
        show(json_url);
    });
 
 
});

function showFirstPage(){
    var json_url=$http_post + "veiculo/read_paging.php";
    show(json_url);
}
 
// function to show list of products
function show(json_url){
 
    // get list of products from the API
    $.getJSON(json_url, function(data){
 
        // html for listing products
        readTemplate(data, "");
 
        // chage page title
        changePageTitle("Listagem de Veículos");
 
    });
}
