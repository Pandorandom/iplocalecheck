/*
Using ipapi to obtain latitude/longitude, then refer to openweather API for weather information.

to get info from ipai:
curl https://ipapi.co/latitude
curl https://ipapi.co/longitude

This search returns the JSON information. To see the full JSBON object, you can use:
curl https://ipapi.co/json
*/

// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Grid View - set the divs to a 2x4 view
function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "25%";
  }
}

// get the json of your IP information from ipapi
function getLocale() {
  // XMLHttpRequest does https
  var xhttp = new XMLHttpRequest();
  var url = 'https://ipapi.co/json';
  xhttp.open("GET", url)
  xhttp.send();
  xhttp.onreadystatechange = (e)=>{
    if(xhttp.readyState === 4 && xhttp.status === 200) {
      var json = JSON.parse(xhttp.responseText);
      var data = new Object();
      data.ip = json.ip;
      data.city = json.city;
      data.region = json.region;
      data.country = json.country;
      data.region_code = json.region_code;
      data.country_name = json.country_name;
      data.continent_code = json.continent_code;
      data.in_eu = json.in_eu;
      data.postal = json.postal;
      data.latitude = json.latitude;
      data.longitude = json.longitude;
      data.timezone = json.timezone;
      data.utc_offset = json.utc_offset;

      /* Once the api call to ipapi is complete, some DOM manipulation to update the divs on info.html to be for the specific user.
      In the future, I would like to move this to a node.js project using (as of now) the following packages:
      request, express, dotenv
      */
      document.querySelector('#ip').textContent = data.ip;
      document.querySelector('#cityState').textContent = (data.city + ', ' + data.region_code);
      document.querySelector('#latitude').textContent = data.latitude;
      document.querySelector('#longitude').textContent = data.longitude;
      document.querySelector('#timezone').textContent = data.timezone;
      document.querySelector('#countryName').textContent = data.country_name;
      document.querySelector('#postal').textContent = data.postal;
    }
  }
}

function init() {
  gridView();
  getLocale();
}

init();
