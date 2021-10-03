var submitBtn = document.getElementById('submitBtn');
var cityname = document.getElementById('cityname');

submitBtn.addEventListener('click', () => {

    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=" + cityname.value + "&lang=en&units=metric&mode=JSON", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "61703bfadamshef4edeb72b4f507p143644jsn8d874ec3320e"
        }
    })
        .then(response => response.json())
        .then(data => {
            var info = document.getElementById('winfo');
            var childs = info.children;

            console.log(data);

            childs[7].innerText = ""; // reset the default text inside the black box 
            childs[0].innerText = "City : " + cityname.value;
            childs[1].innerText = "Temp : " + data['main'].temp + " celcius";
            childs[2].innerText = "Temp max : " + data['main'].temp_max + " celcius";
            childs[3].innerText = "Temp min : " + data['main'].temp_min + " celcius";
            childs[4].innerText = "Feels like : " + data['main'].feels_like + " celcius";
            childs[5].innerText = "Weather : " + data['weather'][0]['main'];
            childs[6].innerText = "Weather desc : " + data['weather'][0]['description'];
        })
        .catch(err => {
            winfo.innerHTML = '<div class = "text-center my-5 fw-bold py-4" style="font-size :2rem;">The city name you have given does not exist in our database ! OR something else went wrong please try again</div>';
            console.error(err);
        });
});
