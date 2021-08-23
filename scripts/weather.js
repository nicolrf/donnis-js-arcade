(function() {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  let myLat = '';
  let myLon = '';
  let $loc = $('#location');
  let $temp = $('#temp');
  let $main = $('#main');
  let $pic = $('#pic');

  navigator.geolocation.getCurrentPosition(function (position) {
    // console.log('lat: ' + position.coords.latitude);
    // console.log('lon: ' + position.coords.longitude);
    myLat = position.coords.latitude;
    myLon = position.coords.longitude;
    getWeather();
  })
  
  function getWeather() {
    $.ajax({
        url: `${weatherUrl}lat=${myLat}&lon=${myLon}&appid=${weatherKey}`,
        success: function( response ) {
            apiSuccess(response.main.temp, 
              response.name, 
              response.weather[0].main, 
              response.weather[0].icon);
              $('#weatherSection').removeClass('d-none');
        },
        error: function() {
          apiError();
        }
    });
  }

  function apiSuccess(temp, loc, mainweath, pic) {
    console.log('openweather success');
    let myPic = 'http://openweathermap.org/img/wn/'+pic+'@2x.png';
    let myTemp = parseInt(1.8*(temp - 273) + 32) + ' degrees';
    myWeather = mainweath;
    // console.log(myWeather);
    $loc.html(loc);
    $temp.html(myTemp);
    $main.text(myWeather);
    $pic.html(`<img src="${myPic}">`);
  }

  function apiError() {
    console.log("api nope :(");
    $('#weatherSection').addClass('d-none');
  }
})();
