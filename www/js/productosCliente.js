function getProductosXCliente(sic, nomCliente) {
    // console.log(sic + nomCliente);
    $('#modal_please_wait').modal('show');
    getProductos(sic, nomCliente);

}

function getProductos(sic, nomCliente) {

    console.log("funcion getProductos");
    consultarProductosCliente(sic).then(
        function(respProductos) {
            var respProductos_json = respProductos.responseJSON;
            var productosArray = respProductos_json.Productos;
            // console.log(respProductos_json);
            // console.log(productosArray);
            console.log("Consulta productos cliente trae respuesta");
            if (respProductos_json.Id === "1") {
                $("#modalPageBody").load("html/productosCliente.html");
                setTimeout(function() {
                    document.getElementById('tituloModalOperaciones').innerHTML = "Productos Relacionados";
                    document.getElementById('paginadorCliente').style = "display:none";
                    document.getElementById('resumeCliente').innerHTML = nomCliente + ", " + sic;
                }, 500);

                setTimeout(
                    function(){
                        productosArray.forEach(producto => {
                            //console.log(producto);
                            crearLista(producto);
                        });
                    }, 500);
                

                $('#modal_please_wait').modal('hide');
            } else {
                $('#modal_please_wait').modal('hide');
                $('#errorModal').modal('show');
                document.getElementById('msjError').innerHTML = respProductos_json.MensajeAUsuario;
            }
        },
        function(error) {
            // console.log(error);
            console.log("Consulta productos cliente trae respuesta");
            $('#modal_please_wait').modal('hide');
            $('#errorModal').modal('show');
            if (error.errorCode === 'API_INVOCATION_FAILURE') {
                document.getElementById('msjError').innerHTML = 'Tu sesión ha expirado';
            } else {
                document.getElementById('msjError').innerHTML = 'El servicio no esta disponible, favor de intentar mas tarde';
            }
        }
    );

}

function crearLista(producto) {
   // console.log(producto);
    var ul = document.createElement("ul");
    var li_Cuenta = document.createElement("li");
    var li_Nombre = document.createElement("li");
    var li_Descrip = document.createElement("li");
    var li_Secuencia = document.createElement("li");


    var textoNumCuenta = document.createTextNode(mascaraNumeroCuenta(producto.EntidadCuenta));
    var textoNombreProducto = document.createTextNode(producto.DescripcionProducto);
    var textoTipoInterviniente = document.createTextNode("Tipo Interviniente: " + producto.TipoInterviniente);
    var textoSecuencia = document.createTextNode("Secuencia Interviniente: " + producto.SecuenciaIntervin);

    li_Cuenta.appendChild(textoNumCuenta);
    li_Nombre.appendChild(textoNombreProducto);
    li_Descrip.appendChild(textoTipoInterviniente);
    li_Secuencia.appendChild(textoSecuencia);

    ul.appendChild(li_Cuenta);
    ul.appendChild(li_Nombre);
    ul.appendChild(li_Descrip);
    ul.appendChild(li_Secuencia);

    var div = document.getElementById("listaProductos");
    div.appendChild(ul);
}

