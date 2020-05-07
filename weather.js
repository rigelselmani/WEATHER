$(document).ready(function(){

function addLocation(){
    var city=$("input[type='text']").val().trim();
    var queryURL="http://api.openweathermap.org/data/2.5/weather?q="
    var apiKey="&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial"
   
    $.ajax({
        url:queryURL+city+apiKey,
        method:"GET"
    }).then(function(response){
        console.log(response)
       $(".state").text(response.name)
       $(".temp").text("temp: "+Math.floor(response.main.temp)+"°")
       $(".wind").text("Wind speed: "+Math.floor(response.wind.speed))
       $(".humidity").text("Humidity: "+response.main.humidity+"%")
     });
}
$("input").keypress(function(event){
    if(event.which===13){
        addLocation()
    }
})

$("button").on("click",function(){

    if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            $.get( "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude+"&sensor-false",function(data){
                console.log(data);
            });
        });
    else
        console.log("Geolocation is not suported");
    
});
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