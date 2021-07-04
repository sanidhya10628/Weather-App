const request = require('request');
const express = require('express');
const app = express();
const path = require('path')
const mapbox_api_key = 'pk.eyJ1Ijoic2FuaWRoeWExMDYyOCIsImEiOiJja3FtOXBhMXMwMHlkMnBucDB6NjhvbW92In0.j6oDSSxX0sWQAJxxvZsyyw';
const openweather_Apikey = '8f5b985082e90fb7919ae2a875977cbf';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Body Parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/weather', (req, res) => {
    const cityname = req.query.cityname.toUpperCase();

    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let dateno = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let shift = "AM";
    const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
    day = dayArray[day];
    const monthArray = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    month = monthArray[month];
    if (hh > 12) {
        hh = hh % 12;
        shift = "PM";
    }
    if (hh < 10) {
        hh = `0${hh}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    const ndate = { day, month, dateno, hh, mm, shift };

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityname}.json?access_token=${mapbox_api_key}&limit=1`;

    request({ url: url, json: true }, (error, response) => {
        const geoApiData = response.body.features[0];
        const lat = geoApiData.center[1];
        const long = geoApiData.center[0];


        const openweatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${openweather_Apikey}`;

        request({ url: openweatherurl, json: true }, (error, response) => {
            const weatherMain = response.body.weather[0].main;
            const weatherDesc = response.body.weather[0].description;
            const country = response.body.sys.country;
            const temp = response.body.main.temp;
            const feels_like = response.body.main.feels_like;
            res.render('weather.ejs', { weatherMain, weatherDesc, country, temp, feels_like, cityname, ndate })
        })
    })
})
// const cityname = 'indore';

// const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityname}.json?access_token=${mapbox_api_key}&limit=1`;

// request({ url: url, json: true }, (error, response) => {
//     const geoApiData = response.body.features[0];
//     const lat = geoApiData.center[1];
//     const long = geoApiData.center[0];


//     const openweatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${openweather_Apikey}`;

//     request({ url: openweatherurl, json: true }, (error, response) => {
//         console.log(response.body);
//     })
// })

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("On PORT:8000");
})







