
getDate()

function getDate(){

    let options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    
    let today  = new Date();
    $("#date").text(today.toLocaleDateString("en-US", options));
    }