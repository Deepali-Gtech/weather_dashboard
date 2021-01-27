$(document).ready(function () {

    $("#submitBtn").click(function () {
       
        var city = $("#city").val().trim();
        var lat;
        var lon;
        if (city) {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&unit=imperial&appid=f1776acffaf07b5eb75b1acbf047c38b",
                method: "GET",
            }).then(function (response) {
                console.log(response);
                var city_date = response.name + "(" + getDate(response.dt) + ")";
                $("#city-name").html(city_date);
                var imgW = $("<img>");
                imgW.attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                $("#city-name").append(imgW);

                $("#temp").html("Temperature: " +  response.main.temp + " F");
                $("#humidity").html("Humidity: " + response.main.humidity + " %");
                $("#windSpeed").html("Wind Speed: " +response.wind.speed + " MPH");

                lat = response.coord.lat;
                lon = response.coord.lon;

                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&unit=imperial&appid=f1776acffaf07b5eb75b1acbf047c38b",
                    method: "GET",
                }).then(function (response) {
                   
                    var newDiv = $("<div>");
                    newDiv.html(city);
                    newDiv.css('border', 'thin solid black');
                    newDiv.css('text-align', 'center');
                    $("#city").val("");
                    $("#search-history").append(newDiv);

                    $("#uv-label").html("UV Index: ")
                    $("#uvi").html(response.daily[0].uvi);

                    $("#uvi").css('background-color', 'red');
                    
                    $("#forecast").html("");

                    var days = 5;
                    var divForecastHeading = $("<h2>");
                    divForecastHeading.html(days + "-Day Forecast");
                    $("#forecast").append(divForecastHeading);

                    var divForecast = $("<div>");
                    divForecast.addClass("row");
                    $("#forecast").append(divForecast);

                    var index = 1;
                    while (index <= days) {
                        var divOne = $("<div>");
                        divOne.addClass("card text-white bg-primary mb-3 col-sm-2 px-2");
                        divOne.css('max-width', '18rem');

                        var divDate = getHtmlElement("<div>", "card-header", getDate(response.daily[index].dt));
                        divOne.append(divDate);

                        var divCardBody = $("<div>");
                        divCardBody.addClass("card-body");

                        var img = $("<img>");
                        img.attr("src", "http://openweathermap.org/img/w/" + response.daily[index].weather[0].icon + ".png");
                        divCardBody.append(img);

                        var divTemp = getHtmlElement("<p>", "card-text", "Temp: " + response.daily[index].temp.day + " F");
                        divCardBody.append(divTemp);

                        var divHumidity = getHtmlElement("<p>", "card-text", "Humidity: " + response.daily[index].humidity + "%");
                        divCardBody.append(divHumidity);

                        divOne.append(divCardBody);

                        divForecast.append(divOne);
                        index++;
                    }

                });
            });
        } else {
            alert("Please enter city name.")
        }
    });
});

function getHtmlElement(element, classes, html){
    var element = $(element);
    element.addClass(classes);
    element.html(html);
    return element;
}

function getDate(epochDate) {
    var date = new Date(0);
    date.setUTCSeconds(epochDate);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}
