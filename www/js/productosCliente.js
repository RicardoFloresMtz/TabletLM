function getProductosXCliente(sic, nomCliente) {
    console.log(sic + nomCliente);
    $("#modalPageBody").load("html/productosCliente.html");

    setTimeout(function() {
        $('#modal_please_wait').modal('show');
        document.getElementById('tituloModalOperaciones').innerHTML = "Productos Relacionados";
        document.getElementById('paginadorCliente').style = "display:none";
        document.getElementById('resumeCliente').innerHTML = nomCliente + ", " + sic;
        getProductos(sic);
    }, 1000);

}

function getProductos(sic) {
    
    console.log("funcion getProductos");
    consultarProductosCliente(sic).then(
        function(respProductos) {
            var respProductos_json = respProductos.responseJSON;
            var productosArray = respProductos_json.Productos;
            console.log(respProductos_json);
            console.log(productosArray);
            if (respProductos_json.Id === "1") {
                productosArray.forEach(producto => {
                    console.log(producto);
                    crearLista(producto);

                });
            } else {
                $('#modal_please_wait').modal('hide');
                $('#errorModal').modal('show');
                document.getElementById('msjError').innerHTML = respProductos_json.MensajeAUsuario;
            }


        }
    );

}

// function crearLista(producto) {

//     var div = document.createElement("div");
//     var lista = document.createElement("li");
//     var aNumCuenta = document.createElement("a");
//     var aNombreProducto = document.createElement("a");
//     var aTipoInter = document.createElement("a");
//     var aSecuencia = document.createElement("a");

//     const textoNumCuenta = document.createTextNode(producto.EntidadCuenta);
//     const textoNombreProducto = document.createTextNode(producto.DescripcionProducto);
//     const textoTipoInterviniente = document.createTextNode("Tipo Interviniente" + producto.DescripcionProducto);
//     const textoSecuencia = document.createTextNode("Secuencia Interviniente" + producto.SecuenciaIntervin);

//     document.appendChild(div, lista);
//     document.appendChild(lista, aNumCuenta);
//     document.appendChild(lista, aNombreProducto);
//     document.appendChild(lista, aTipoInter);
//     document.appendChild(lista, aSecuencia);

//     document.appendChild(aNumCuenta, textoNumCuenta);
//     document.appendChild(aNombreProducto, textoNombreProducto);
//     document.appendChild(aTipoInter, textoTipoInterviniente);
//     document.appendChild(aSecuencia, textoSecuencia);

// }

function crearLista(producto) {
    console.log(producto)
    var ul = document.createElement("ul");
    var li = document.createElement("li");

    var textoNumCuenta = document.createTextNode(producto.EntidadCuenta);
    var textoNombreProducto = document.createTextNode(producto.DescripcionProducto);
    var textoTipoInterviniente = document.createTextNode("Tipo Interviniente" + producto.DescripcionProducto);
    var textoSecuencia = document.createTextNode("Secuencia Interviniente" + producto.SecuenciaIntervin);

    li.appendChild(textoNumCuenta);
    li.appendChild(textoNombreProducto);
    li.appendChild(textoTipoInterviniente);
    li.appendChild(textoSecuencia);

    ul.appendChild(li);

    var div = document.getElementById("listaProductos");
    div.appendChild(ul);
}