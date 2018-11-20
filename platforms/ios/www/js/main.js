

$(document).ready(function(){
    
    $('#modal_please_wait').modal('hide');
    console.log("Ini main.js");
    // algoritmo para imagen collapse dinamica  y  transicion de collapse
    dinamyCollapse();
    getPerfilEmpleadoMain();
    
});

function getInfoCliente(){
   
    console.log("getInfoCliente");
    validaEntrada();
}

function getPerfilEmpleadoMain(){
    consultaPerfilEmpleado("1").then(
        function(succes){
                var jsonData = succes.responseJSON;
                document.getElementById("p_infoEmpleado").innerHTML = jsonData.NombreUsuario +"<br>" + sessionStorage.getItem("idUsuario");

        },function(error){
           // console.log(error);
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

function detectarEnter(event){
 var tecla = event.which || event.keyCode;
 // console.log("Numero de tecla" + tecla);
 if(tecla === 13){
    getInfoCliente();
 }
}


 function validaEntrada(){
        
    var valueBusqueda = document.getElementById("txtFind").value;
    valueBusqueda = valueBusqueda.toUpperCase();
    var tam_valueBusqueda = valueBusqueda.length;
    var stringData;
    //console.log("Value: "+  valueBusqueda);
    //console.log("Tam: "+ tam_valueBusqueda);
    var exp_numerico = /^([0-9])*$/;
    var opc;
    if(valueBusqueda == ""){
        
        $("#txtFind").addClass("error-margin");
        $(".error").fadeOut().remove();
        $("#txtFind").after(
            '<span class="error col-sm-12 " id="errorFind">Dato obligatorio</span>');
            document.getElementById("msjError").innerHTML="No se encontraron coincidencias, verifica la informaci&oacute;n o intenta una nueva busqueda";
            $('#errorModal').modal('show');
    }
    else{

        if(tam_valueBusqueda == 8 || tam_valueBusqueda == 16 || tam_valueBusqueda == 10){
           
                if (exp_numerico.test(valueBusqueda)){
                    //console.log( " Es numerico");
                     opc = 2;
                     getDatosClientePRS64(valueBusqueda,opc);
                } else{
                    //console.log( "No Es numerico");
                    if(isCorrectNombre(valueBusqueda)) {
                        // Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1
                        opc = 1;
                        //console.log("Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1")
                        stringData = corectTamNombre(valueBusqueda);
                        //console.log(stringData);
                        getDatosClientePRS64(stringData,opc);
                    }
                }
        }else{
            //console.log( "No Es numerico");
            if(isCorrectNombre(valueBusqueda)) {
                // Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1
                opc = 1;
                //console.log("Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1")
                stringData = corectTamNombre(valueBusqueda);
                //console.log(stringData);
                getDatosClientePRS64(stringData,opc);
            }
        }
    }
}

function isCorrectNombre(string){
    var array = string.split(",");
    var res;
    if(array.length == 2 || array.length == 3)
    {
                // Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1
                //console.log("Tiene nombre, apellido 1 y apellido 2 o Tiene nombre y apellido 1");
                $("#txtFind").removeClass("error-margin");
                $(".error").fadeOut().remove();
                res = true;

    }else{
                // esto no es posible
                //console.log("esto no es posible");
                $("#txtFind").addClass("error-margin");
                $(".error").fadeOut().remove();
                $("#txtFind").after(
                    '<span class="error col-sm-12 " id="errorFind">Nombre(s) y apellido(s) deben de ir separados por comas.</span>');
                //muestra modal de error
                res= false;
    }
    return res;
}

function corectTamNombre(string) {
    var array = string.split(",");
    var tam_array = array.length;
    var res;

        for(var i = 0; i < tam_array; i++ ) {
            var elemento = array[i];
            var elemento_aux = elemento.trim();
            if(elemento_aux.length > 20){
                array[i] = elemento_aux.substring(0, 20);
            }else{
                array[i] = elemento_aux;
            }
        }
    return array.toString();
    
}

function getDatosClientePRS64(data, opc) {
    
    searchClient(data, opc).then(
    function(resp){
        //console.log(resp);
        var jsonCliente = resp.responseJSON;
        if(jsonCliente.Id == "1") {
            var arrayClientes = jsonCliente.Clientes;
            var tam_arrayClientes = arrayClientes.length;
            if(tam_arrayClientes > 0){
                console.log("entra a getDatosClientePRS64");
                // console.log(arrayClientes);
                $("#modalPageBody").load("html/infoCliente.html");
                setTimeout(function(){
                    showDataCliente(arrayClientes);
                },2000);
            } else {
                $("#modal_please_wait").modal("hide");
                $('#errorModal').modal('show');
                document.getElementById('msjError').innerHTML = "No se encontraron coincidencias, verifica la informaci&oacute;n o intenta una nueva b&uacute;squeda. ";
            }
        }else{ 
            $("#modal_please_wait").modal("hide");
            $('#errorModal').modal('show');
              document.getElementById('msjError').innerHTML = jsonCliente.MensajeAUsuario;
        }
    }, function(error){
        $("#modal_please_wait").modal("hide");
        // console.log(error);
    });
}

function validaTexto(){
    var texto = document.getElementById("txtFind").value;
    //texto = texto.toUpperCase();
    var tam_texto = texto.length;
    //var reg_exp= /^[a0-zA9-Z-ÑñáéíóúÁÉÍÓÚ]+(\s*[a0-zA9-Z-äëöüÄËÖÜÑñáéíóúÁÉÍÓÚ'/\.\-\_]*)*[a0-zA9-Z-ÑñáéíóúÁÉÍÓÚ\s]+$/;
    var reg_exp=/^[a0-zA9-Z-ÑñáéíóúÁÉÍÓÚ]+(\s*[a0-zA9-Z-äëöüÄËÖÜÑñáéíóúÁÉÍÓÚ'/\.\-\_\,]*)*[a0-zA9-Z-ÑñáéíóúÁÉÍÓÚ\s]+$/;;
    var exp_numerico = /^([0-9])*$/;
    if(texto == ""){
        //console.log("dato vacio");
        document.getElementById("lbSugerencia").innerHTML = "Puedes localizar clientes por numero de tarjeta, numero de cliente o nombre completo";
        $("#txtFind").addClass("error-margin");
        $(".error").fadeOut().remove();
        $("#txtFind").after(
            '<span class="error col-sm-12 " id="errorFind">Dato obligatorio</span>');
    }else{
        if(reg_exp.test(texto)){
            //console.log("formato correcto");
            if (exp_numerico.test(texto)){
                //console.log("es numero");
                if(esSICTarjetaCuenta(tam_texto)){
                    $("#txtFind").removeClass("error-margin");
                    $(".error").fadeOut().remove();
                }else{
                    $("#txtFind").addClass("error-margin");
                     console.log("No es Sic, num tarjeta ni numero de cuenta");
                }
                document.getElementById("lbSugerencia").innerHTML = "Puedes localizar clientes por numero de tarjeta, numero de cliente o nombre completo";
            }else{
                console.log("es alfanumerico");
                $("#txtFind").removeClass("error-margin");
                $(".error").fadeOut().remove();
               /* if(isCorrectNombre(texto)){
                    $("#txtFind").removeClass("error-margin");
                }else{
                    $("#txtFind").addClass("error-margin");
                    console.log("Nombre y apellido deben de ir separados por comas");
                }*/
                document.getElementById("lbSugerencia").innerHTML = "Para una busqueda de cliente por nombre usa el siguiente formato: <br> NOMBRE(S), 1ER APELLIDO, 2DO APELLIDO(dato opcional)";
            }
        }else{
            //console.log("formato incorrecto");
            $("#txtFind").addClass("error-margin");
            $(".error").fadeOut().remove();
            $("#txtFind").after(
                '<span class="error col-sm-12" id="errorFind">Dato invalido</span>');
        }
    }
}

function esSICTarjetaCuenta(tam_texto){
    var resultado = false;
    if(tam_texto == 8 || tam_texto == 16 || tam_texto == 10){
        resultado = true;     
    }
    return resultado;
}


    function goNotificaciones(){
        document.getElementById("msjError").innerHTML="Este servicio est&aacute; en construcci&oacute;n";
        $('#errorModal').modal('show');
    }

    function goEmitTicket(){
        document.getElementById("msjError").innerHTML="Este servicio est&aacute; en construcci&oacute;n";
        $('#errorModal').modal('show');
    }

    function goAutoriza(){
        document.getElementById("msjError").innerHTML="Este servicio est&aacute; en construcci&oacute;n";
        $('#errorModal').modal('show');
    }

    function goSaldos(){
        document.getElementById("msjError").innerHTML="Este servicio est&aacute; en construcci&oacute;n";
        $('#errorModal').modal('show');
    }
    

    
