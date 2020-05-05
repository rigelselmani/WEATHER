var APIKey="0ab9af27ca97b79fdc2b37ec61800370&units=imperial"

var queryURL="http://api.openweathermap.org/data/2.5/weather?q=ashburn,virginia&appid="+APIKey

$.ajax({
    url:queryURL,
    method:"GET"
}).then(function(response){
   console.log(response.main.temp)
   $(".state").text(response.name)
   $(".temp").text(Math.floor(response.main.temp+"o"))
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