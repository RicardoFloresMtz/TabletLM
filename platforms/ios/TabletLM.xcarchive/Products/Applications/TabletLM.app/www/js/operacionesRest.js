

function getCordernadasOrigen(){
    
    var resourceRequest;
        resourceRequest = new WLResourceRequest( 'adapters/AdapterBanorteTabletLM/resource/getCordenadasOrigen', WLResourceRequest.POST);
        resourceRequest.setTimeout(30000);

       return  resourceRequest.send();
}

function getAcceso(usr, pass){

    var formParameters = {
        usr: usr,
        pass: pass
    }
    var resourceRequest;
        resourceRequest = new WLResourceRequest( 'adapters/AdapterBanorteTabletLM/resource/tryAcceso', WLResourceRequest.POST);
        resourceRequest.setTimeout(30000);

       return  resourceRequest.sendFormParameters(formParameters);
}

function searchClient(data,opc){
    $("#modal_please_wait").modal("show");
    var formParameters = {
        data: data,
        opc: opc
    }
    var resourceRequest;
        resourceRequest = new WLResourceRequest( 'adapters/AdapterBanorteTabletLM/resource/getInfoCliente', WLResourceRequest.POST);
        resourceRequest.setTimeout(30000);

       return  resourceRequest.sendFormParameters(formParameters);
}

 function identificaEmpleado(idEmpleado) {

    var formParameters = {

        idEmpleado: idEmpleado

    };

    var resourceRequest = new WLResourceRequest(

        'adapters/AdapterBanorteTabletLM/resource/identificaUsuario',
        WLResourceRequest.POST);
    resourceRequest.setTimeout(30000);

    return resourceRequest.sendFormParameters(formParameters);
}



function autenticEmpleado(respUsuario) {

    var formParameters = {
        respUsuario: respUsuario
    };
    var resourceRequest = new WLResourceRequest(
        'adapters/AdapterBanorteTabletLM/resource/autenticaUsuario',
        WLResourceRequest.POST);
    resourceRequest.setTimeout(30000);

        return resourceRequest.sendFormParameters(formParameters);
}



function cerrarSesion() {

    var formParameters = {
    };

    var resourceRequest = new WLResourceRequest(
   'adapters/AdapterBanorteTabletLM/resource/cerrarSession',
        WLResourceRequest.POST);
    resourceRequest.setTimeout(30000);

        return resourceRequest.sendFormParameters(formParameters);

}

 function consultaDatosEmpleado(idEmpleado) {
    var formParameters = {
        idEmpleado: idEmpleado
    };

    var resourceRequest = new WLResourceRequest(
        'adapters/AdapterBanorteTabletLM/resource/consulEmpleado',
        WLResourceRequest.POST);
    resourceRequest.setTimeout(30000);

        return resourceRequest.sendFormParameters(formParameters);

}

function consultaPerfilEmpleado(opc) {
    var formParameters = {
        opc: opc
    };

    var resourceRequest = new WLResourceRequest(
        'adapters/AdapterBanorteTabletLM/resource/getInfoEmpleado',
        WLResourceRequest.POST);
    resourceRequest.setTimeout(30000);

        return resourceRequest.sendFormParameters(formParameters);

}

function errorPromise(error){
    $('#modal_please_wait').modal('hide');
    $('#errorModal').modal('show');
    if (error.errorCode === 'API_INVOCATION_FAILURE') {
        document.getElementById('msjError').innerHTML = 'Tu sesión ha expirado';
    } else {
      document.getElementById('msjError').innerHTML = 'El servicio no esta disponible, favor de intentar mas tarde';
    }
  }