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
        });
    }
});   

    function apiResponse(response){
        $(".temp").text(Math.floor(response.main.temp)+" °")
        $(".city").text(response.name);
        $(".wind").text("Wind: "+Math.floor(response.wind.speed)+" MPH")
        $(".humidity").text("Humidity: "+response.main.humidity+" %")
        $(".sky").text(response.weather[0].main)
    }
    
    function imageDisplay(response){
        
        var day=response.weather[0].icon

        if(response.weather[0].main=="Rain"&&response.weather[0].icon.includes("d")){
            $('body').css('background-image', 'url(http://www.nosmokeandmirrors.com/wp-content/uploads/2016/12/drops-1436231_1280.jpg)');              
        }else if(response.weather[0].main=="Clouds"&&response.weather[0].icon.includes("d")){
            $('body').css('background-image', 'url(https://eoimages.gsfc.nasa.gov/images/imagerecords/84000/84662/rover__pho_7268_lrg.jpg)');              
        }else if(response.weather[0].main=="Clear"&&response.weather[0].icon.includes("d")){
            $('body').css('background-image', 'url(https://bloximages.chicago2.vip.townnews.com/valdostadailytimes.com/content/tncms/assets/v3/editorial/8/ec/8ec8ad4f-a97f-5686-9b3d-91c2e79ca90e/5ad4263c86d82.image.jpg?resize=400%2C199)');              
        }else if(response.weather[0].main=="Rain"&&response.weather[0].icon.includes("n")){
            $('body').css('background-image', 'url(https://i.ytimg.com/vi/7JyE47-Ykjo/maxresdefault.jpg)');              
        }else if(response.weather[0].main=="Clouds"&&response.weather[0].icon.includes("n")){
            $('body').css('background-image', 'url(https://i.ytimg.com/vi/fh_PMSPe4FA/maxresdefault.jpg)');              
        }else if(response.weather[0].main=="Clear"&&response.weather[0].icon.includes("n")){
            $('body').css('background-image', 'url(https://static.skillshare.com/uploads/parentClasses/f03056b1cea891ef9f1769aedfad5a79/ceac10d9)');              
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


//    daily weather   for next 5 days
function daily(){

    if(navigator.geolocation){
        console.log("geolocation aviable")
        navigator.geolocation.getCurrentPosition(position =>{
            var latit=position.coords.latitude;
            var longi=position.coords.longitude;
            console.log(latit)
            console.log(longi)
    const queryURL="https://api.openweathermap.org/data/2.5/onecall?lat="+latit+"&lon="+longi+"&exclude=dayli&appid=0ab9af27ca97b79fdc2b37ec61800370&units=imperial"
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        firstDay(response)

    });
   });
     }else{
    console.log("Geolocation is not suported");
    }
}   

    function firstDay(response){
        var wDay=["sun","mon","tue","wed","thu","fri","sat"];
        rowCount = response.daily;
        var rowCount=8;

        for (i=1;i<rowCount;i++){
            var ts=new Date(response.daily[i].dt * 1000);
            var forecast=wDay[ts.getDay()]
        $(".weekDays").append("<h5>"+forecast+"</h5>");
        $(".minTemp").append("<p>"+Math.floor(response.daily[i].temp.min)+" °"+"</p>")
        $(".maxTemp").append("<p>"+Math.floor(response.daily[i].temp.max)+" °"+"</p>")
        $(".p3").append(response.daily[i].weather[0].main)
        }
    }
daily()
    // end of daily logic for next 5 days
