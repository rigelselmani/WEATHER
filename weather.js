$(document).ready(function(){
    
    function addLocation(){
    getDate()
    if(navigator.geolocation){
             console.log("geolocation aviable")
             navigator.geolocation.getCurrentPosition(position =>{
                 var latit=position.coords.latitude;
                 var longi=position.coords.longitude;

            var queryURL="https://api.openweathermap.org/data/2.5/weather?lat="+latit+"&lon="+longi+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial";
        
            $.ajax({
               url:queryURL,
               method:"GET"
            }).then(function(response){

                apiResponse(response)
                tempConverter(response)
                imageDisplay(response)

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

        var queryURL="https://api.openweathermap.org/data/2.5/weather?q="+text+"&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial"
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
        
           apiResponse(response)
           tempConverter(response)
           imageDisplay(response)
        })
    }
});   

    function apiResponse(response){
        $(".temp").text(Math.floor(response.main.temp)+" °")
        $(".state").text(response.name);
        $(".wind").text("Wind: "+Math.floor(response.wind.speed)+" MPH")
        $(".humidity").text("Humidity: "+response.main.humidity+" %")
        $(".cloudy").text(response.weather[0].main)
    }
    
    function imageDisplay(response){
        if(response.weather[0].main=="Rain"){
            $('.container').css('background-image', 'url(https://cdn.abcotvs.com/dip/images/5184599_031119-kgo-shutterstock-rain-img.jpg?w=1600)');              
        }else if(response.weather[0].main=="Clouds"){
            $('.container').css('background-image', 'url(https://www.farmersalmanac.com/wp-content/uploads/2011/09/Clouds-Predict-Local-Weather-i861387936.jpg)');              
        }else if(response.weather[0].main=="Clear"){
            $('.container').css('background-image', 'url(https://theliberal.ie/wp-content/uploads/2016/08/sunnyspelll.jpg)');              
        }
    }

    function tempConverter(response){
        let celcius=(response.main.temp -32) *(5/9);
        $(".c").on("click",function(){
          $(".temp").text(Math.floor(celcius)+" °")
        })
        $(".f").on("click",function(){
            $(".temp").text(Math.floor(response.main.temp)+" °")
        })
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
});
