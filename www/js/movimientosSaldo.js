var fechaMesActualFin;
var fechaMesActualIni;
var numCuenta;

function modalSaldos() {
    $("#modalPageBody").load("html/saldosMovimientos.html");
    document.getElementById('tituloModalOperaciones').innerHTML = "Saldos y movimientos";
    $('#modalOperaciones').modal('show');
}

function calcularFechames(activoFijo) {
    const this_aux = this;

    var dia = new Date().getUTCDate();
    var mes = new Date().getUTCMonth()+1;
    var anio = new Date().getFullYear();
    
        console.log(dia+"-"+mes+"-"+ anio);

        if( activoFijo == 1){
            if ((this_aux.mes) < 10) {
                this_aux.fechaMesActualFin = (anio + "-" + "0" + (mes) + "-" + dia).toString();
                this_aux.fechaMesActualIni = (anio + "-" + "0" + (mes - 1) + "-" + dia).toString();
    
            } else {
                this_aux.fechaMesActualFin = (anio + "-" + (mes) + "-" + dia).toString();
                if(mes -1 < 10){
                    this_aux.fechaMesActualIni = (anio + "-0" + (mes - 1) + "-" + dia).toString();
                } else{
                    this_aux.fechaMesActualIni = (anio + "-" + (mes - 1) + "-" + dia).toString();
                }
                
            }
        } else {
            if ((this_aux.mes) < 10) {
                this_aux.fechaMesActualFin = (anio + "-" + "0" + (mes ) + "-" + dia).toString();
                this_aux.fechaMesActualIni = (anio + "-" + "0" + (mes - 3) +"-" + dia).toString();
    
            } else {
                this_aux.fechaMesActualFin = (anio + "-" + (mes ) + "-" + dia).toString();
                if(mes - 3 < 10){
                    this_aux.fechaMesActualIni = (anio + "-0" + (mes - 3) + "-" +dia).toString();
                } else{
                    this_aux.fechaMesActualIni = (anio + "-" + (mes - 3) + "-" +dia).toString();
                }
                
            }

        }
  
        
        console.log("fecha inicial "+ fechaMesActualIni+" Fecha final "+ fechaMesActualFin);
        $('#fechaInicial').val(fechaMesActualIni);
        $('#fechaFinal').val(fechaMesActualFin);
}

function consultarMovimientosPeticion(){
   
  
    cuenta = numCuenta;
    fechaDesde = fechaMesActualIni;
    fechaHasta = fechaMesActualFin;
    consultaMovimientos(cuenta, fechaDesde, fechaHasta).then(
        function(response) {
            var respMovimientos_json = response.responseJSON;
            var movimientos = respMovimientos_json.movimientos;
            console.log(movimientos);
            console.log(respMovimientos_json);
            
            if (respMovimientos_json.Id === "1") {
                //mostrarListaMovimientos(movimientos);
                console.log("Si hay movimientos");
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


function obtenerPeriodo(){
    let activoFijo = $('input[name="radio"]:checked').val();
    console.log(activoFijo);

    
        calcularFechames(activoFijo);
        
    
    //console.log(options[select.value-1].innerHTML)
  }

function obtenerCuenta(){
    numCuenta = document.getElementById("numCuenta").value;
    console.log(numCuenta);
}

