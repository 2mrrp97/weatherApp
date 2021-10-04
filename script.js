function populate_element(node, data, iscard, index) {
    var childs = node.children;
    if (7 < childs.length)
        childs[7].innerText = ""; // reset the default text inside the black box 


    if (iscard) {
        var fheading = document.getElementById('fheading');
        fheading.style.display = "block";
    }

    var str = data['list'][index].dt_txt;
    childs[0].innerText = iscard ? "" + str.slice(10, str.length - 3) : "City : " + cityname.value + " \n Updated : " + str.slice(10, str.length - 3);
    childs[1].innerText = "Temp : " + data['list'][index]['main'].temp + " celcius";
    childs[2].innerText = "Temp max : " + data['list'][index]['main'].temp_max + " celcius";
    childs[3].innerText = "Temp min : " + data['list'][index]['main'].temp_min + " celcius";
    childs[4].innerText = "Feels like : " + data['list'][index]['main'].feels_like + " celcius";
    childs[5].innerText = "Weather : " + data['list'][index]['weather'][0]['main'];
    childs[6].innerText = "Weather desc : " + data['list'][index]['weather'][0]['description'];
};


var submitBtn = document.getElementById('submitBtn');
var cityname = document.getElementById('cityname');

submitBtn.addEventListener('click', () => {

    fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=" + cityname.value + "&units=metric&mode=json&lang=en&cnt=6", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "61703bfadamshef4edeb72b4f507p143644jsn8d874ec3320e"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var info = document.getElementById('maindiv');

            let index = 0;
            populate_element(info, data, false, index++);

            var forecast = document.getElementById('forecast_div');
            forecast.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                forecast.innerHTML += `<div class = "card py-5 px-3 col-lg-2 col-md-4 col-sm-8">
                                            <h3 class="temp text-center my-2 mb-5"></h3>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                        </div>`;
            }

            var cards = forecast.children;

            for (let i = 0; i < cards.length; i++, index++) {
                populate_element(cards[i], data, true, index);
            }
        })
        .catch(err => {
            winfo.innerHTML = '<div class = "text-center my-5 fw-bold py-4" style="font-size :2rem;">The city name you have given does not exist in our database ! OR something else went wrong please try again</div>';
            console.error(err);
        });
});


