document.getElementById('alert-message').style.display = "none";

function checkValidation() {
    const cityname = document.forms['weather-form']['cityname'].value;
    // console.log(cityname);
    if (cityname === '') {
        // document.getElementById('alert-message').style.display = "block";
        return false;
    }

    else {
        return true;
    }
}