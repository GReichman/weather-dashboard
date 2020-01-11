var key = "cc781640716e500eeebae6f7fb4712e2";
var locationName="Atlanta";

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?" + "q="+locationName+"&units=imperial&appid="+key,
    method: "GET"
}).done(function(response){
    console.log(response);
});