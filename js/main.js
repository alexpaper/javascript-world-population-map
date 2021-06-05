// Some Start Variables
let cntr = ["41.87839", "12.48634"];
let wpop = 7795232630;
let popup = 'sitowebveloce'
// Select DOM elements
const mapDiv = document.querySelector('.map');
const form = document.querySelector('.form');
const tooltip = document.querySelector('.tooltip');
const loader = document.querySelector('.loader');
// App Init
function appInit() { 
    // Loader
    loaderFn('visible');
    // Load Map
    mapBox(cntr, 2, popup);
    // Show World population
    tooltip.style.visibility = 'visible';
    tooltip.innerHTML = `World current population: ${thousandSeparator(wpop)}`;
    // Loader
    loaderFn('hidden');
}

// DOM CONTENT LOADER EVENT
window.DOMContentLoaded = appInit();

// Form event listener
form.addEventListener('submit', async e => {
    e.preventDefault();
    // console.log(e.target[0].value);
     // Get country
     let country = e.target[0].value;
     // Check value
     if(!worldArray.includes(captilizeAllWords(country))){
        alert(`${country} - invalid country name.`)
         return
     }
     // Loader
     loaderFn('visible');
    // Hide tooltip
    tooltip.style.visibility = 'hidden';
    tooltip.innerHTML = '';
   
    // Geocoding
    let geo = await geocoding(country);
    // Get population data
    let pop = await worldPopulation(captilizeAllWords(country));
    console.log(pop);
    // Shoow tooltip
    if(pop){
        tooltip.style.visibility = 'visible';
        tooltip.innerHTML = `${captilizeAllWords(country)} current population: ${pop}`;
        // Change Map view
        mapBox(geo, 4, pop);
    }
     // Loader
     loaderFn('hidden');
   
});
// MapBox Function
function mapBox(center, zoom, popup){
    let map = new mapboxgl.Map({
        container: mapDiv, // CONTAINER
        style:'mapbox://styles/mapbox/streets-v9', // Style
        center:center,  // starting position [lng, lat]
        zoom:zoom,
    });  
    // Pop Up
    var mapPopup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(center)
    .setHTML(`<h1>${popup}</h1>`)
    .addTo(map);

    // Hover Coordinates
    map.on('mousemove', function (e) {
        document.getElementById('info').innerHTML =
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        JSON.stringify(e.point) +
        '<br />' +
        // e.lngLat is the longitude, latitude geographical position of the event
        JSON.stringify(e.lngLat.wrap());
        });
};

// Geocoding
async function geocoding(country) {
    try {
        let fetchData = await fetch(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${country}&language=en&country=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidapiKey,
                "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com"
            }
        })
        let res = await fetchData.json()
        // Check length
        if (res.results.length > 0) {
            let data = [
                res.results[0].location.lng,
                res.results[0].location.lat
            ];
            // console.log(data);
            return data;
        } else {
            return cntr;
        }
    } catch (err) {
        console.error(err);
    };
}

// World Population
async function worldPopulation (country){
    try{
        let fetchData = await fetch(`https://world-population.p.rapidapi.com/population?country_name=${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidapiKey,
                "x-rapidapi-host": "world-population.p.rapidapi.com"
            }
        });
        let res = await fetchData.json();
        if(res.ok){
        return  thousandSeparator(res.body.population);
        }else{
            return  thousandSeparator(000000)
        }
    }
    catch(error){
        console.log(error);
    }
} 


// Reverse Geocoding
async function reverseGeocode (lat, lng){
    try{
        let fetchData = await fetch(`https://geocodeapi.p.rapidapi.com/GetTimezone?latitude=${lat}&longitude=${lng}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidapiKey,
                "x-rapidapi-host": "geocodeapi.p.rapidapi.com"
            }
        });
        let res = await fetchData.json();
        if(res){
        return  worldPopulation(res.Country);
        }
        worldPopulation('Italy');

    }catch(error){
        console.log(error);
    }
}

// Thousand separator
function thousandSeparator (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Capitalize
const captilizeAllWords = sentence => {
    if (typeof sentence !== "string") return sentence
  
    return sentence.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

// Loader
function loaderFn (set){
    if(set === 'visible'){
        loader.style.visibility = set;
    }else if(set === 'hidden' ){
    setTimeout(()=>{
        loader.style.visibility = set;
        }, 300);
    };
}

// World Countries array
  const worldArray = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei ",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Caribbean Netherlands",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Channel Islands",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Côte Ivoire",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czech Republic (Czechia)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "DR Congo",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Faeroe Islands",
    "Falkland Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "North Korea",
    "North Macedonia",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Barthelemy",
    "Saint Helena",
    "Saint Kitts Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre Miquelon",
    "Samoa",
    "San Marino",
    "Sao Tome Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Vincent Grenadines",
    "State of Palestine",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos",
    "Tuvalu",
    "U.S. Virgin Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Wallis Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];