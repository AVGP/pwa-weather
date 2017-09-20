var locations = []
var locationList = document.querySelector('ul')
var locationTpl = document.querySelector('template').content
var addButton = document.querySelector('button')

try {
  locations = JSON.parse(localStorage.getItem('locations')) || []
} catch(err) { /* meh */ }

for(let location of locations) {
  addLocationToList(location)
}

addButton.addEventListener('click', () => {
  var location = window.prompt('Enter a location')
  if(!location) return

  locations.push(location)
  localStorage.setItem('locations', JSON.stringify(locations))
  addLocationToList(location)
})

function addLocationToList(location) {
  getWeather(location).then((weather) => {
    let li = document.importNode(locationTpl, true)
    li.querySelector('h2').textContent = location
    li.querySelector('img').src = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    li.querySelector('p').textContent = `${weather.main.temp} °C - ${weather.weather[0].description}`
    locationList.appendChild(li)
  })
}

function getWeather(city) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=6fb16872c800649a6f7a568cccda7475`).then(r => r.json())
}