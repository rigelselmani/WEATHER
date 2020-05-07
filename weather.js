$(document).ready(function(){

function addLocation(){
    if(navigator.geolocation){
             console.log("geolocation aviable")
             navigator.geolocation.getCurrentPosition(position =>{
                 var latit=position.coords.latitude;
                 console.log(latit)
                 var longi=position.coords.longitude;
                 console.log(longi)
               var queryURL="http://api.openweathermap.org/data/2.5/weather?lat="+latit+"&lon="+longi+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial"
        
            $.ajax({
               url:queryURL,
               method:"GET"
            }).then(function(response){
               console.log(response)
              $(".state").text(response.name)
              $(".temp").text(Math.floor(response.main.temp)+" °")
              $(".wind").text("Wind: "+Math.floor(response.wind.speed)+" MPH")
              $(".humidity").text("Humidity: "+response.main.humidity+" %")
            });
        });
    }else{
        console.log("Geolocation is not suported");
    }
}

function fiveDaysWeather(){
    var queryURL="http://api.openweathermap.org/data/2.5/forecast?lat=39.0344729&lon=-77.52617599999999&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial";

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        console.log(response)
    })
}
addLocation()
fiveDaysWeather()

function getDate(){

    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let today  = new Date();
    $("#date").text(today.toLocaleDateString("en-US", options));
    }

getDate()

})