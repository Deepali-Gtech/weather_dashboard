$(document).ready(function () {

    $("#submitBtn").click(function () {
        console.log("here");
        var city = $("#city").val();
        var lat;
        var lon;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&unit=imperial&appid=f1776acffaf07b5eb75b1acbf047c38b",
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var date = new Date(0);
            date.setUTCSeconds(response.dt);
            var city_date = response.name + " (" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")";
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
            });
        });
    });
});
