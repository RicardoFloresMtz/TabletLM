function getProductosXCliente(sic, nomCliente){
    console.log(sic + nomCliente);
    $("#modalPageBody").load("html/productosCliente.html");
    document.getElementById('tituloModalOperaciones').innerHTML="Productos Relacionados";
    document.getElementById('paginadorCliente').style="display:none";
    document.getElementById('resumeCliente').innerHTML= nomCliente + ", "+ sic ;
    
    
}