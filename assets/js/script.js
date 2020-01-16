const key = "cc781640716e500eeebae6f7fb4712e2";
var locationName = "Atlanta";
var thisMoment = moment().format("L");
var savedButtons=[];


$("#cityButtonDiv").on("click", "btn", function () {

    locationName = $(this).attr("data-city");

    displayWeather(locationName);
    displayForecast(locationName);
});

$("#city-search").click(function () {


    addCityButton($(".form-control").val());

});
//localStorage.setItem("cities",null);
getSavedButtons();
var size=savedButtons.length;
for(let i=0;i<size;i++){
    addCityButton(savedButtons[i]);
}//initialize buttons
console.log("buttons: "+savedButtons);
locationName = savedButtons[0];
displayWeather(locationName);
displayForecast(locationName);

function getSavedButtons(){
    let buttons = JSON.parse(localStorage.getItem("cities"));
    console.log(buttons);
    if(buttons!=null){
        savedButtons=buttons;
    }

    else{
        savedButtons.push("Atlanta");
        saveButtons();
    }

}//getSavedButtons

function saveButtons(){

    localStorage.setItem("cities",JSON.stringify(savedButtons));

}//saveButtons

function removeButton(button){
    //https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
    
    var cityName=button.attr("data-city");
    savedButtons=savedButtons.filter(e => e !== cityName);
    button.remove();
    saveButtons();


}//removeButton

function displayWeather(locationName) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?" + "q=" + locationName + "&units=imperial&appid=" + key,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        displayCurrentWeather(response);
    }).fail(function(response){
        console.log("failed");
        var button = $("btn").first().data("city",locationName);
        removeButton(button);

    });


}//displayWeather

function createForecastElement(date, temp, humidity, weather) {
    let mediaElement = $("<div>").addClass("media");

    let mediaPic = $("<img>").addClass("mr-3 weatherPictures");
    mediaPic.attr({
        src: "http://openweathermap.org/img/wn/" + weather + "@2x.png",
        alt: weather
    });
    mediaElement.append(mediaPic);

    let mediaBody = $("<div>").addClass("media-body");
    let mediaHeader = $("<h5>").addClass("mt-0");
    mediaHeader.text(date);
    let mediaTemp = $("<p>").addClass("dayTemp");
    mediaTemp.text("Temp: "+temp + "°F");
    let mediaHumidity = $("<p>").addClass("dayHumidity");
    mediaHumidity.text("Humidity: "+humidity + "%");
    mediaBody.append([mediaHeader, mediaTemp, mediaHumidity]);

    mediaElement.append(mediaBody);

    return mediaElement;

}//createForecastElement

function createCityButton(name) {
    let newButtonDiv = $("<div>").addClass("col-12 cityCols");
    let newButton = $("<btn>").addClass("btn btn-outline-secondary cityButtons");
    newButton.html(name);
    newButton.attr("data-city", name);
    newButtonDiv.append(newButton);

    return newButtonDiv;
}//createCityButton

function addCityButton(name) {
    var button = createCityButton(name);

        $("#cityButtonDiv").prepend(button);
        if(!savedButtons.includes(name)){
        savedButtons.unshift(name);
        saveButtons();
        }


}//addCityButton

function displayCurrentWeather(weather) {
    let currHeader = $("<h2>");
    let currPicture = $("<img>");
    let currTemp = $("<p>");
    let currHumidity = $("<p>");
    let currWind = $("<p>");
    let currUV = $("<p>");

    $.ajax({
        url: "http:api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + weather.coord.lat + "&lon=" + weather.coord.lon,
        method: "GET"
    }).done(function (response) {
        currUV.text("UV Index: " + response.value);
        $("#currWeather").append(currUV);
    });


    currHeader.text(locationName + " (" + thisMoment + ")");
    currPicture.attr("src", "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");
    currHeader.append(currPicture);

    currTemp.text("Temp: " + weather.main.temp + "°F");
    currHumidity.text("Humidity: " + weather.main.humidity + "%");
    currWind.text("Wind Speed: " + weather.wind.speed + " MPH");

    $("#currWeather").empty().append(currHeader);
    $("#currWeather").append(currTemp);
    $("#currWeather").append(currHumidity);
    $("#currWeather").append(currWind);

}//displayCurrentWeather

function displayForecast(city) {

    var forecast = [];
    var tomorrow = moment();
    tomorrow.add(1, "days");
    var lastIndex = 0;


    console.log(tomorrow.format("YYYY-MM-DD 12:00:00"));

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key,
        method: "GET"
    }).done(function (response) {
        console.log(response);

        for (var x = 0; x < 5; x++) {
            for (var i = lastIndex; i < response.list.length; i++) {
                let currForecast = response.list[i];
                if (currForecast.dt_txt == tomorrow.format("YYYY-MM-DD 12:00:00")) {
                    forecast.push(currForecast);
                    lastIndex = i;
                    tomorrow.add(1, "days");
                }//if its noon of the target day

            }//for
        }//iterate 5 times
        var forecastElements=createForecast(forecast);


        for(let y=0; y<forecastElements.length;y++){
            let index=y+1;
            $("#forecast"+index).html(forecastElements[y]);


        }

    });




 
}//displayForecast

function createForecast(forecast) {
    var forecastElements=[];
    console.log(forecast)

    for(let i=0; i<forecast.length;i++){
        let date = forecast[i].dt_txt;
        date = date.slice(5,10);
        let temp = forecast[i].main.temp;
        let humidity = forecast[i].main.humidity;
        let weatherCode= forecast[i].weather[0].icon;

        forecastElements.push(createForecastElement(date,temp,humidity,weatherCode));
    }//for each day


    return forecastElements;
}