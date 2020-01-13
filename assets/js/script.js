var key = "cc781640716e500eeebae6f7fb4712e2";
var locationName="Atlanta";

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?" + "q="+locationName+"&units=imperial&appid="+key,
    method: "GET"
}).done(function(response){
    console.log(response);
});



var testForecast=createForecastElement("01/12/2020",68.7,60,"sunny");

$("#forecast2").html(testForecast);



function createForecastElement(date, temp, humidity,weather){   
    let mediaElement = $("<div>").addClass("media");
    
    let mediaPic = $("<img>").addClass("mr-3 weatherPictures");
    mediaPic.attr({
        src: "assets/pictures/"+weather+".jpg",
        alt: weather
    });
    mediaElement.append(mediaPic);


    let mediaBody = $("<div>").addClass("media-body");
    let mediaHeader = $("<h5>").addClass("mt-0");
    mediaHeader.text(date);
    let mediaTemp = $("<p>").addClass("dayTemp");
    mediaTemp.text(temp+"F");
    let mediaHumidity = $("<p>").addClass("dayHumidity");
    mediaHumidity.text(humidity+"%");
    mediaBody.append([mediaHeader,mediaTemp,mediaHumidity]);

    mediaElement.append(mediaBody);

    return mediaElement;

}//createForecastElement

function createCityButton(name){

}