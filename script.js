const api = 'bbc7c1f9912c999f6c581fedf8849074';
const iconImg = document.getElementById('weather_img');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener( 'load' , () => {
    let latitude;
    let longitude;

    //Accessing Geolocation of User
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing the Longitude and Latitude
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}&units=metric`
            
            // Fetching the base data and converting to json format
            fetch(base).then((response) => {
                return response.json()
            }).then((data) => {
                const place = data.name;
                const {temp} = data.main;
                const {description, icon} = data.weather[0];
                const {sunrise, sunset} = data.sys;

                // Converting the icon to a link
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                // Converting the temp to fahrenheit
                const fahrenheit = (temp * 9)/ 5 + 32;
                // The given time from the API is in epochUnix so we have to convert it to human readable form
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                // Interacting and Updating the DOM
               iconImg.src = iconUrl
               loc.textContent = `${place}`
               desc.textContent = `${description}`
               tempC.textContent = `${temp.toFixed(2)} ℃`
               tempF.textContent = `${fahrenheit.toFixed(2)} ℉`
              sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
               sunsetDOM.textContent =  `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            })
        })
    }
})