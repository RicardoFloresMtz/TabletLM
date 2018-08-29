var angulo;

function dinamyCollapse() {
    console.log(angulo);
    angulo= window.orientation;
    var attClas= document.getElementById("sidebar").getAttribute("class");
    if(angulo == 90 || angulo == -90){
        if(attClas == "active" ){  document.getElementById("sidebarCollapse").setAttribute("src","img/expand.png");      
          }else{   document.getElementById("sidebarCollapse").setAttribute("src","img/collapse.png");
        }
    }
    console.log(angulo);
    $( window ).on( "orientationchange", function( evento ) {
       angulo = evento.currentTarget[0].orientation;
       console.log(angulo);
       var attClas= document.getElementById("sidebar").getAttribute("class");
        console.log(attClas);
        if(angulo == 0 || angulo == 180){
            if(attClas == "active" ){     document.getElementById("sidebarCollapse").setAttribute("src","img/collapse.png");
            }else{    document.getElementById("sidebarCollapse").setAttribute("src","img/expand.png");
            }
        }
        if(angulo == 90 || angulo == -90){
            if(attClas == "active" ){   document.getElementById("sidebarCollapse").setAttribute("src","img/expand.png");   
              }else{      document.getElementById("sidebarCollapse").setAttribute("src","img/collapse.png");
            }
        }
      });
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        var attClas= document.getElementById("sidebar").getAttribute("class");
          console.log(attClas);
        if(angulo == 0 || angulo == 180){
            if(attClas == "active" ){    document.getElementById("sidebarCollapse").setAttribute("src","img/collapse.png");
            }else{     document.getElementById("sidebarCollapse").setAttribute("src","img/expand.png");
            }
        }
        if(angulo == 90 || angulo == -90){
            if(attClas == "active" ){    document.getElementById("sidebarCollapse").setAttribute("src","img/expand.png");
              }else{     document.getElementById("sidebarCollapse").setAttribute("src","img/collapse.png");
            }
        }
    });
}