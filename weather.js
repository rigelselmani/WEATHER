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
              $(".cloudy").text(response.weather[0].main)

              let celcius=(response.main.temp -32) *(5/9);
              $(".c").on("click",function(){
                $(".temp").text(Math.floor(celcius)+" °")
              })
              console.log(Math.floor(celcius))
              $(".f").on("click",function(){
                  $(".temp").text(Math.floor(response.main.temp)+" °")
              })

              if(response.weather[0].main=="Rain"){
                $('.container1').css('background-image', 'url(https://cdn.vox-cdn.com/thumbor/LF-o7juzy4AMUa2p6i8qWaFw4xU=/0x0:2048x1156/1200x800/filters:focal(299x94:625x420)/cdn.vox-cdn.com/uploads/chorus_image/image/49587899/15746767658_8338d05a3e_k.0.jpg)');              
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

$("input[type='text']").keypress(function(event){
    if(event.which===13){
        var text=$(this).val().trim();
        $("input").val("")

        var queryURL="http://api.openweathermap.org/data/2.5/weather?q="+text+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial"
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){

          $(".temp").text(Math.floor(response.main.temp)+" °");
          $(".state").text(response.name);
          $(".humidity").text("Humidity: "+Math.floor(response.main.humidity)+" %");
          $(".wind").text("Wind Speed: "+Math.floor(response.wind.speed));
          $(".cloudy").text(response.weather[0].main)

          let celcius=(response.main.temp -32) *(5/9);
          $(".c").on("click",function(){
            $(".temp").text(Math.floor(celcius)+" °")
          })
          console.log(Math.floor(celcius))
          $(".f").on("click",function(){
              $(".temp").text(Math.floor(response.main.temp)+" °")
          })

        //   var time=response.sys.sunrise
        //   var date = new Date(time * 1000);
        //   var timeStr = date.toLocaleTimeString();
        

          if(response.weather[0].main==="Rain"){
            $('.container1').css('background-image', 'url(http://1.bp.blogspot.com/-zLSkuSN9qBY/TiYKIIAl0eI/AAAAAAAAAOg/XKb3fo6LOhs/s1600/paris-rain-1920x1200.jpg)');              
        }else if(response.weather[0].main==="Clouds"){
            $('.container1').css('background-image', 'url(https://www.farmersalmanac.com/wp-content/uploads/2011/09/Clouds-Predict-Local-Weather-i861387936.jpg)');              
        }else if(response.weather[0].main==="Clear"){
            $('.container1').css('background-image', 'url(https://get.pxhere.com/photo/cloud-sky-white-weather-cumulus-blue-toy-sunny-clouds-clouded-sky-clouds-form-sunny-day-cumulus-clouds-cumulus-cloud-summer-day-meteorological-phenomenon-atmosphere-of-earth-1287206.jpg)');              
        }
        })
    }
});
        
 

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
