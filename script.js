$(document).ready(function () {

    $("#submitBtn").click(function () {
        console.log("here");
        var city = $("#city").val().trim();
        var lat;
        var lon;
        if (city){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&unit=imperial&appid=f1776acffaf07b5eb75b1acbf047c38b",
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var city_date = response.name + "(" + getDate(response.dt) + ")";
            $("#city-name").html(city_date);
            $("#temp").html(response.main.temp + " F");
            $("#humidity").html(response.main.humidity + " %");
            $("#windSpeed").html(response.wind.speed + " MPH");

            lat = response.coord.lat;
            lon = response.coord.lon;

            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&unit=imperial&appid=f1776acffaf07b5eb75b1acbf047c38b",
                method: "GET",
            }).then(function (response) {
                console.log(response);
                var newDiv = $("<div>");
                newDiv.html(city);
                newDiv.css('border', 'thin solid black');
                newDiv.css('text-align', 'center');
                $("#city").val("");
                $("#search-history").append(newDiv);

                $("#date-1").html(getDate(response.daily[1].dt));
                $("#max-temp-1").html("Temp: " + response.daily[1].temp.day + " F");
                $("#max-humidity-1").html("Humidity: " + response.daily[1].humidity + " %");

                $("#date-2").html(getDate(response.daily[2].dt));
                $("#max-temp-2").html("Temp: " + response.daily[2].temp.day + " F");
                $("#max-humidity-2").html("Humidity: " + response.daily[2].humidity + " %");

                $("#date-3").html(getDate(response.daily[3].dt));
                $("#max-temp-3").html("Temp: " + response.daily[3].temp.day + " F");
                $("#max-humidity-3").html("Humidity: " + response.daily[3].humidity + " %");

                $("#date-4").html(getDate(response.daily[4].dt));
                $("#max-temp-4").html("Temp: " + response.daily[4].temp.day + " F");
                $("#max-humidity-4").html("Humidity: " + response.daily[4].humidity + " %");

                $("#date-5").html(getDate(response.daily[5].dt));
                $("#max-temp-5").html("Temp: " + response.daily[5].temp.day + " F");
                $("#max-humidity-5").html("Humidity: " + response.daily[5].humidity + " %");

            });
        });
    } else {
        alert("Please enter city name.")
    }
    });
});

function getDate(epochDate) {
    var date = new Date(0);
    date.setUTCSeconds(epochDate);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  }
