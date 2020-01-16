# weather-dashboard
https://greichman.github.io/weather-dashboard/
<br />
By: Garrett Reichman

## Description
    This project was made to gain experience with
requesting and using data from remote databases using api's. It requests current and future weather data from various cities based on user input. It then saves that input to local storage for future use on the site.

## Usage
    When the page is first loaded, it will default to the   
weather in Atlanta. To view weather in other cities type the city name in the search bar and click the magnifying glass button. This will add a new button to the area below the search bar that, when clicked, will display the weather in the chosen city. On future visits to the site, the last city that was searched for will be displayed when the page loads.

![Screenshot](assets/pictures/screenshot.png)

## Known Issues
    When a city button is clicked that doesnt return an   
successful response, the button will be removed from the list and from local storage. However, if the button is added then the page refreshed without it being clicked, it will cause issues on future page loads until a valid city is searched for.

    When the page loads, the last searched city will be  
displayed, but the first button on the list will not be the current city due to the buttons being prepended