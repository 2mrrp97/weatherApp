var pgbarContainer = document.getElementById('pgbarContainer');
var forecast = document.getElementById('forecast_div');

// populate the fore cast cards
for (let i = 0, h = 3; i < 5; i++, h += 3) {
    forecast.innerHTML += `<div class = "card py-5 px-3 col-lg-2 col-md-4 col-sm-8">
                                            <h3 class="temp text-center my-2 mb-2">After ${h} hours at</h3>
                                            <h3 class="temp text-center my-2 mb-5"></h3>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                            <h6 class="temp text-center my-2"></h6>
                                        </div>`;
}


function populate_element(node, data, iscard, offset, index) {
    var childs = node.children;
    if (7 + offset < childs.length)
        childs[7 + offset].innerText = ""; // reset the default text inside the black box 

    // set main div and forecast div values if data is to be put other wise reset values for refresh prg bar effect
    if (data != null) {
        var str = data['list'][index].dt_txt;

        childs[0 + offset].innerText = iscard ? str.slice(10, str.length - 3) + " hr" 
                                       : "City : " + cityname.value + " \n Last Updated : " + str.slice(10, str.length - 3) + " hr";
        childs[1 + offset].innerText = "Temp : " + data['list'][index]['main'].temp + " celcius";
        childs[2 + offset].innerText = "Temp max : " + data['list'][index]['main'].temp_max + " celcius";
        childs[3 + offset].innerText = "Temp min : " + data['list'][index]['main'].temp_min + " celcius";
        childs[4 + offset].innerText = "Real feel : " + data['list'][index]['main'].feels_like + " celcius";
        childs[5 + offset].innerText = "Weather : " + data['list'][index]['weather'][0]['main'];
        childs[6 + offset].innerText = "Weather desc : " + data['list'][index]['weather'][0]['description'];
    }
    else {
        for (let i = 0; i <= 6; i++) {
            childs[i + offset].innerText = "";
        }
    }

};

function run_API() {
    fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=" + cityname.value + "&units=metric&mode=json&lang=en&cnt=6", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "61703bfadamshef4edeb72b4f507p143644jsn8d874ec3320e"
        }
    })
        .then(response => response.json())
        .then(data => {

            pgbarContainer.style.display = "none"; // hide progress bar before showing actual results 
            var info = document.getElementById('maindiv');

            let index = 0;
            // fill main day div 
            populate_element(info, data, false, 2, index++);

            forecast.style.display = "flex"; // set display flex to appear again 
            var cards = forecast.children;

            // fill forecast cards
            for (let i = 0; i < cards.length; i++, index++) {
                populate_element(cards[i], data, true, 1, index);
            }
        })

        .catch(err => {
            winfo.innerHTML = '<div class = "text-center my-5 fw-bold py-4" style="font-size :2rem;">The city name you have given does not exist in our database ! OR something else went wrong please <a href ="">Click here</a> to try again</div>';
            console.error(err);
        });
}

var submitBtn = document.getElementById('submitBtn');
var cityname = document.getElementById('cityname');

submitBtn.addEventListener('click', () => {
    var info = document.getElementById('maindiv');
    var str = info.children[0].innerText;
    var pgbar = document.getElementById('pgbar');
    var prompt = document.getElementById('prompt'); // the input prompt

    prompt.style.display = "none"; // hide prompt;
    pgbarContainer.style.display = "flex"; // show progress bar 

    let index = 0;
    // remove data in main div and set display for forecast part to none for refresh effect every time a 
    // new req is sent 
    populate_element(info, null, false, 2, index);
    forecast.style.display = "none";

    let i = 0;
    var t = setInterval(() => {
        if (i >= 100) {
            clearInterval(t);
            run_API();
            return;
        }
        pgbar.value = i;
        i += 10;
    }, 50);

});


