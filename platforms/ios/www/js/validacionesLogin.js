function validaUsuario(){
    // console.log("validaUsuario")
    var usr = document.getElementById("txtUsr").value;
    var expReg = /^[a0-zA9-Z]+(\s*[a0-zA9-Z]*)*[a0-zA9-Z-\s]+$/;
    if(usr == ""){
        //mostrar toltip error
        $(".tooltipError").fadeOut().remove();
        $("#txtUsr").after(
          '<span class=" tooltipError" id="errorUsr">Dato obligatorio</span>');
    }else if(usr.length < 8){
          $(".tooltipError").fadeOut().remove();
          $("#txtUsr").after(
            '<span class=" tooltipError" id="errorUsr">Dato no v&aacute;lido</span>');
    } else {
        if (expReg.test(usr)){
          $(".tooltipError").fadeOut().remove();
        }else{
          //mostrar toltip error
          $(".tooltipError").fadeOut().remove();
          $("#txtUsr").after(
            '<span class=" tooltipError" id="errorUsr">Dato no v&aacute;lido</span>');
        }
    }
    activaBtnEntrar();
  }

  function validaPass(){
    // console.log("validaPass");
    var pass = document.getElementById("txtPass").value;
    var expReg = /^[a0-zA9-Z]+(\s*[a0-zA9-Z-/\.\-\_\@\$]*)*[a0-zA9-Z-\s]+$/;
    if(pass == ""){
      //mostrar toltip error
      $(".tooltipError").fadeOut().remove();
      $("#txtPass").after(
        '<span class="tooltipError" id="errorPass">Dato obligatorio</span>');
    }else{
      if (expReg.test(pass)){
           $(".tooltipError").fadeOut().remove();
      }else{
        //mostrar toltip error
        $(".tooltipError").fadeOut().remove();
        $("#txtPass").after(
          '<span class="tooltipError" id="errorPass">Dato no v&aacute;lido</span>');
      }
    }
    activaBtnEntrar();
  }

  function activaBtnEntrar(){
    // console.log("activaBtnEntrar")
    var pass = document.getElementById("txtPass").value;
    var usr = document.getElementById("txtUsr").value;
    var expRegUser= /^[a0-zA9-Z]+(\s*[a0-zA9-Z]*)*[a0-zA9-Z-\s]+$/;
    var expRegPass= /^[a0-zA9-Z]+(\s*[a0-zA9-Z-/\.\-\_\@\$]*)*[a0-zA9-Z-\s]+$/;

    if(expRegPass.test(pass) && expRegUser.test(usr) && usr.length >= 8){
            document.getElementById("btnLogin").disabled = false;
    }else{
            document.getElementById("btnLogin").disabled = true;
    }

  }