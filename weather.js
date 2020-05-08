$(document).ready(function(){
    
    function addLocation(){
    getDate()
    if(navigator.geolocation){
             console.log("geolocation aviable")
             navigator.geolocation.getCurrentPosition(position =>{
                 var latit=position.coords.latitude;
                 console.log(latit)
                 var longi=position.coords.longitude;
                 console.log(longi)
               var queryURL="https://api.openweathermap.org/data/2.5/weather?lat="+latit+"&lon="+longi+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial";
        
            $.ajax({
               url:queryURL,
               method:"GET"
            }).then(function(response){
              $(".state").text(response.name)
              $(".temp").text(Math.floor(response.main.temp)+" °")
              $(".wind").text("Wind: "+Math.floor(response.wind.speed)+" MPH")
              $(".humidity").text("Humidity: "+response.main.humidity+" %")
              if(response.weather[0].main=="Rain"){
                $('.container1').css('background-image', 'url(https://wallpapercave.com/wp/9EjbNTw.jpg)');              
            }else if(response.weather[0].main=="Clouds"){
                $('.container1').css('background-image', 'url(https://www.farmersalmanac.com/wp-content/uploads/2011/09/Clouds-Predict-Local-Weather-i861387936.jpg)');              
            }else if(response.weather[0].main=="Clear"){
                $('.container1').css('background-image', 'url(https://get.pxhere.com/photo/cloud-sky-white-weather-cumulus-blue-toy-sunny-clouds-clouded-sky-clouds-form-sunny-day-cumulus-clouds-cumulus-cloud-summer-day-meteorological-phenomenon-atmosphere-of-earth-1287206.jpg)');              
            }
            });
        });
    }else{
        console.log("Geolocation is not suported");
    }
}

function getDate(){

    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    
    let today  = new Date();
    $("#date").text(today.toLocaleDateString("en-US", options));
    }

addLocation()
// fiveDaysWeather()
});

// function fiveDaysWeather(){

//     if(navigator.geolocation){
//         console.log("geolocation aviable")
//         navigator.geolocation.getCurrentPosition(position =>{
//             var latit=position.coords.latitude;
//             console.log(latit)
//             var longi=position.coords.longitude;
//             console.log(longi)
//     var queryURL="https://api.openweathermap.org/data/2.5/forecast?lat="+latit+"&lon="+longi+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial";

//     $.ajax({
//         url:queryURL,
//         method:"GET"
//     }).then(function(response){
//         var p1=$("<p>");
//           p1.addClass("lTemperature");
//           p1.text(Math.floor(response.list[2].main.temp_min)+"-"+Math.floor(response.list[2].main.temp_max))
//           $(".lists").prepend(p1);   
//        })
//     })
//   }else{
//       console.log("geolocation not suported")
//   }
// }
