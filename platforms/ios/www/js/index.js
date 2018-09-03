

function wlCommonInit() {
  app.init();
}

var app = {
  //initialize app
  "init": function init() {
    $("#modal_please_wait").modal("show");
    $("#pageBody").load("html/login.html");
    getSerialNumber();
  },
}

function getSerialNumber(){
    window.resolveLocalFileSystemURL(cordova.file.documentsDirectory + "numeroserie.txt", getFileSuccess, getFileFail);
}

function getFileFail(e) {
  $("#modal_please_wait").modal("hide");

  $('#errorModal').modal('show');
  document.getElementById('imgclose').style = "display: none";
  document.getElementById('msjError').innerHTML = 'No pudimos obtener el numero de serie del dispositivo. ';
  setTimeout(
    function(){ 
            MOForceAppClose.forceAppClose();
    }, 10000);
}

function getFileSuccess(fileEntry) {
  fileEntry.file(function(file) {
                 var reader = new FileReader();
                 reader.onloadend = function(e) {
                 console.log("Numero de Serie: " + this.result);
                 var serialNumber = this.result;
                 sessionStorage.setItem("numeroSerie", serialNumber);
                 setVersionConsole();
                 }
  reader.readAsText(file);
  });
}

function setVersionConsole(){
  WL.App.getServerUrl(function (url) {
    console.log("VERSION: 1.0.1, 24/05/2018 Servidor:" + url )
    $("#modal_please_wait").modal("hide");
  });
}


function salir(){
  $('#modal_please_wait').modal('show');
  cerrarSesion().then(
    function(response) {
     
      console.log(response);
      var responseJSON = response.responseJSON;
      if (responseJSON.Id === 'SEG0001') {
           sessionStorage.removeItem("idUsuario")
            $('#modal_please_wait').modal('hide');
            $("#pageBody").load("html/login.html");

      } else {
          $('#modal_please_wait').modal('hide');
          $('#errorModal').modal('show');
          document.getElementById('msjError').innerHTML = responseJSON.MensajeAUsuario;  
      }

    }, function(error) {
     // errorPromise(error);
     console.log(error);
  });

}

  