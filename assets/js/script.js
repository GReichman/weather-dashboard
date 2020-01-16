const key = "cc781640716e500eeebae6f7fb4712e2";
var locationName = "Atlanta";
var thisMoment = moment().format("L");




$("#cityButtonDiv").on("click", "btn", function () {

    locationName = $(this).attr("data-city");

    displayWeather(locationName);
    displayForecast(locationName);
});

$("#city-search").click(function () {


    addCityButton($(".form-control").val());

});

addCityButton("Atlanta");
addCityButton("New York");
addCityButton("Boston");
addCityButton("London");
var testForecast = createForecastElement("01/12/2020", 68.7, 60, "sunny");

$("#forecast2").html(testForecast);

function displayWeather(locationName) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?" + "q=" + locationName + "&units=imperial&appid=" + key,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        displayCurrentWeather(response);
    });





}

function createForecastElement(date, temp, humidity, weather) {
    let mediaElement = $("<div>").addClass("media");

    let mediaPic = $("<img>").addClass("mr-3 weatherPictures");
    mediaPic.attr({
        src: "assets/pictures/" + weather + ".jpg",
        alt: weather
    });
    mediaElement.append(mediaPic);

    let mediaBody = $("<div>").addClass("media-body");
    let mediaHeader = $("<h5>").addClass("mt-0");
    mediaHeader.text(date);
    let mediaTemp = $("<p>").addClass("dayTemp");
    mediaTemp.text(temp + "F");
    let mediaHumidity = $("<p>").addClass("dayHumidity");
    mediaHumidity.text(humidity + "%");
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

    currTemp.text("Temp: " + weather.main.temp + "F");
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
                // console.log("target date: " + tomorrow.format("YYYY-MM-DD 12:00:00"));
                // console.log("Checking: " + currForecast.dt_txt);
                if (currForecast.dt_txt == tomorrow.format("YYYY-MM-DD 12:00:00")) {
                    forecast.push(currForecast);
                    lastIndex = i;
                    tomorrow.add(1, "days");
                }//if its noon of the target day

            }//for
        }//iterate 5 times
        var forecastElements=createForecast(forecast);

    });




 
}//displayForecast

function createForecast(forecast) {
    var forecastElement=[];
    console.log(forecast)



}