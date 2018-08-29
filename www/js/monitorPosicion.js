function monitoreaPosicion(){

  
    var lat1 = 19.336287; 
    var lon1 = -99.205060;
    var frecuencia = 5000;
                                              
    setInterval( function(l){ getCurrentePosition(lat1, lon1) }, frecuencia);
  }
  
  function getCurrentePosition(lat1, lon1){
    //get pocisition actual
    var element = document.getElementById('geolocation');
    console.log(lat1+", " + lon1)
  
    var onSuccess = function(position) {
      console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
  
            
            var lat2 = position.coords.latitude;
            var lon2 = position.coords.longitude;
            var DistanciaM = Dist(lat1, lon1, lat2, lon2) ;
  
            //element.innerHTML = "Latitude: " + position.coords.latitude      + ' ' +
            //'Longitude: ' + position.coords.longitude + " Distancia: " + DistanciaM;
            
            console.log("Diste" + DistanciaM)
            verificaDistancia(DistanciaM);              
        };
  
  // onError Callback receives a PositionError object
  //
      function onError(error) {
          console.log('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError), {enableHighAccuracy: true};
  }
  
  function Dist(lat1, lon1, lat2, lon2)
  
  {
      console.log("Dist");
      rad = function(x) {return x*Math.PI/180;}
      
      //var R     = 6378.137;
      var R     = 6378.137;                      //Radio de la tierra en km
      var dLat  = rad( lat2 - lat1 );
      var dLong = rad( lon2 - lon1 );
      
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      var m = d.toFixed(3) * 1000
      return m ;                   //Retorna tres decimales
      
  }
  
  function  verificaDistancia(disM){
    if(disM > 35){
      //getcurrectposition para validar si en realidan salio del rango
      //var element = document.getElementById('geolocation');
      //element.innerHTML = "Saliste del rango permitido" + disM;
     // navigator.geolocation.clearWatch(watchID);
    }
  }
  
  function getCordenadasIndex(){
     getCordernadasOrigen.then(
       function(response){
  
       },function(error){
  
       }
     );
  }