

var idUsuario;
$(document).ready(function(){
  console.log("Ini login.js");
 
  });


  function LogIn(){
    $('#modal_please_wait').modal('show');
    var securityCheckName = 'banorteSecurityCheckLM';
      var userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);
      var usr_ca = "admin_tablet";
      var tarjet = "key_tablet";
      console.log("User Security: "+ usr_ca + "  PassSecurity: "+ tarjet);
      WLAuthorizationManager.login(
        securityCheckName, {
                            'usr_tablet' : usr_ca,
                            'key_tablet' : tarjet
                            }).then(
                                      function(response) {
                                        console.log('Login SecurityCheck Success'); 
                                        LogInAfterSecurity();
                                      
                                      },
                                      function(error) {
                                        $("#modal_please_wait").modal("hide");
                                        console.log("Login onFailure: *"
                                                      + JSON.stringify(error.responseJSON));
                                      }
      );
  }

  function LogInAfterSecurity( ) {
    console.log("LogIn")
    var pass = document.getElementById("txtPass").value;
    var usr = document.getElementById("txtUsr").value; 
    identificaEmpleado( usr).then(
      function(resp) {
        console.log(resp);
         var resp_json = resp.responseJSON;
         if (resp_json.Id === 'SEG0001') {
            consultaEmpleado(usr, pass);
         } else {
                 WLAuthorizationManager.logout('banorteSecurityCheckLM');
                $('#modal_please_wait').modal('hide');
                $('#errorModal').modal('show');
                document.getElementById('msjError').innerHTML = resp_json.MensajeAUsuario;
        }
      }, function(error) {
        WLAuthorizationManager.logout('banorteSecurityCheckLM');
        idUsuario = "";
        errorPromise(error);
      });
  }

  function consultaEmpleado(idEmpleado, respuestaUsuario) {

   consultaDatosEmpleado(idEmpleado).then(
      function(resp1) {
        console.log(resp1);
          var resp1_json = resp1.responseJSON;
          if (resp1_json.Id === 'SEG0001') {
                    if(resp1_json.ArrayGrupos == "No pertenece a ningun grupo"){
                      
                      $('#modal_please_wait').modal('hide');
                      $('#errorModal').modal('show');
                      document.getElementById('msjError').innerHTML = "El usuario no pertenece a grupo v&aacute;lido, favor de verificar.";
                      WLAuthorizationManager.logout('banorteSecurityCheckLM');

                    }else{
                      idUsuario = idEmpleado;
                      autenticaUsuario(respuestaUsuario);
                    }
          
           } else {
                $('#modal_please_wait').modal('hide');
                $('#errorModal').modal('show');
                document.getElementById('msjError').innerHTML = resp1_json.MensajeAUsuario;
                WLAuthorizationManager.logout('banorteSecurityCheckLM');
          }
      }, function(error1) {
        idUsuario = "";
        errorPromise(error1);
    });
  }


function  autenticaUsuario(respuestaUsuario) {

    autenticEmpleado(respuestaUsuario).then(
      function(resp2) {
          var resp2_json = resp2.responseJSON;
          console.log(resp2);
          if (resp2_json.Id === 'SEG0001') {
            // mandar a llamar TC con relacion idUsuario, CR y cordenadas
            $("#pageBody").load("html/main.html");
            sessionStorage.setItem("idUsuario", idUsuario);
        } else {
               idUsuario = "";
              $('#modal_please_wait').modal('hide');
              $('#errorModal').modal('show');
              document.getElementById('msjError').innerHTML = resp2_json.MensajeAUsuario;
              WLAuthorizationManager.logout('banorteSecurityCheckLM');

          }
      }, function(error2) {
        WLAuthorizationManager.logout('banorteSecurityCheckLM');
        idUsuario = "";
        errorPromise(error2);
    });
}

function getDatosRef(){
    idEmpleado = "HTARJ860";
    var numSerieResp = "DMPPN2W1G5YN";
    var CRResp  = "1003";
    var latResp  = "19.336517";
    var longResp  = "99.204927";
    var distResp  = "15";
}

