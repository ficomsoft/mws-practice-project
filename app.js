// UI Elements
const icon = document.querySelector('.weather-icon');
const temperatureValue = document.querySelector('.temperature-value h2');
const description = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location h2');
const searchBox = document.querySelector('.search-query');
const dateElement = document.querySelector('.date')

const api = {
    key: '2c877dc0ad6345d47c85ebee795adecb',
    base: 'https://api.openweathermap.org/data/2.5/' 
};

// User Input
searchBox.addEventListener('keypress', setQuery);
function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchBox.value);  
        console.log(searchBox.value);
    }
};

// Retrieve API Content
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        let data = weather.json(); 
        if(query == undefined){
        console.log('City Not Listed');
        locationElement.innerHTML = 'City Not Listed';
        }
        return data;
    })
    .then(displayResults);
}

// Display Returned Data in UI
function displayResults(data){
//    console.log(data);
    data.iconId = data.weather[0].icon;
    data.temperature = Math.floor(data.main.temp);
    data.description = data.weather[0].description;
    data.city = data.name;
    data.country = data.sys.country;
    
    icon.innerHTML = `<img src="icons/${data.iconId}.png" />`;
    temperatureValue.innerHTML = `${data.temperature}° <span>C</span>`;
    description.innerHTML = data.description;
    locationElement.innerHTML = `${data.city}, ${data.country}`;
    
    let date = String(new window.Date());
    date = date.slice(3, 15);
//    console.log(date);
    dateElement.innerHTML = `${date}`;
};


// Register Service Worker    
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registered with scope: ', registration.scope);
    }, function(err) {
      // registration failed 
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


