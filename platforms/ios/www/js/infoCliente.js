function showDataCliente(arrayClientes){
    console.log("entra a showDataCliente");
    console.log(arrayClientes);
   
    var tam_arrayClientes = arrayClientes.length;
    var visiblepages;
    document.getElementById("lbNomCliente").innerHTML=  arrayClientes[0].Tran_NombrePersona;
    document.getElementById("lbNumCliente").innerHTML= arrayClientes[0].Tran_NumeroCliente;
    document.getElementById("lbRFC").innerHTML=  arrayClientes[0].RFCCliente;
    document.getElementById("lbDomicilio").innerHTML =  arrayClientes[0].Domicilio +  ", " +  arrayClientes[0].Colonia +  ", " +  arrayClientes[0].CodigoPostal;
    $("#modal_please_wait").modal("hide");
    //if(tam_arrayClientes > 1 ){

        if(tam_arrayClientes > 5 ){
            visiblepages = 5;
        }else{
            visiblepages = tam_arrayClientes;
        }
        $('#pagination-demo').twbsPagination('destroy');
        $('#pagination-demo').twbsPagination({
        
            totalPages: tam_arrayClientes,
            visiblePages: visiblepages,
            prev: '<span aria-hidden="true">&laquo;</span>',
            next: '<span aria-hidden="true">&raquo;</span>',
            first: '',
            last: '',
            onPageClick: function (event, page) {
                //console.log("entra a onPageClick");
                //console.log(arrayClientes);

                var clienteSelect = arrayClientes[page - 1];
                showDatosClientSelect(clienteSelect);
            }
        });
    //}
    document.getElementById("tituloModalOperaciones").innerHTML = "Identifica al Cliente";
    $('#modalOperaciones').modal('show');
}

 function showDatosClientSelect( clienteSelect){
    document.getElementById("lbNomCliente").innerHTML= clienteSelect.Tran_NombrePersona;
    document.getElementById("lbNumCliente").innerHTML= clienteSelect.Tran_NumeroCliente;
    document.getElementById("lbRFC").innerHTML= clienteSelect.RFCCliente;
    document.getElementById("lbDomicilio").innerHTML = clienteSelect.Domicilio +  ", " + clienteSelect.Colonia +  ", " + clienteSelect.CodigoPostal;
}