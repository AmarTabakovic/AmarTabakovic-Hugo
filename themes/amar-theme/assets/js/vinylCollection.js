const APP_KEY = document.currentScript.getAttribute('key')
const APP_SECRET = document.currentScript.getAttribute('secret')

const vinylListEl = document.getElementById('vinyl-list')
const loadingEl = document.getElementById('loading')
const url='https://api.discogs.com/users/AmarTabakovic/collection/folders/0/releases'
const myHeaders = new Headers();

myHeaders.append('Authorization', 'Discogs key=' + APP_KEY + ', secret=' + APP_SECRET)
console.log("TET")
fetch(url, {
  //mode: 'no-cors',
  headers: myHeaders
})
.then(function(response) {
  return response.json();
})
.then(function(jsonResponse) {
  //console.log(jsonResponse)
  loadingEl.style.display = 'none'
  createElements(jsonResponse)
});

let createElements = (json) => {

  for (var i = 0; i < json.releases.length; i++) {
    let title = json.releases[i].basic_information.title
    let titleEl = document.createElement("h3")
    titleEl.innerHTML = title

    let artistNames = []
    let artists = json.releases[i].basic_information.artists
    for (var j = 0; j < artists.length; j++) {
      artistNames.push(artists[j].name)
    }
    let artist = artistNames.join(", ")

    let artistEl = document.createElement("h4")
    artistEl.innerHTML = artist

    //   

    let genreNames = []
    let genres = json.releases[i].basic_information.genres
    for (var k = 0; k < genres.length; k++) {
      genreNames.push(genres[k])
    }
    let genre = genreNames.join(", ")

    let genreEl = document.createElement("h4")
    genreEl.innerHTML = genre


    let year = json.releases[i].basic_information.year
    let yearEl = document.createElement("h4")
    yearEl.innerHTML = year


    let image = json.releases[i].basic_information.cover_image
    let imageEl = document.createElement("img")
    imageEl.classList = "vinyl-image"
    imageEl.src = image

    let vinylEl = document.createElement("div")
    vinylEl.classList = "vinyl-element"

    let vinylTextEl = document.createElement("div")
    vinylTextEl.classList = "vinyl-text"


    vinylTextEl.append(artistEl)
    vinylTextEl.append(titleEl)
    vinylTextEl.append(yearEl)
    vinylTextEl.append(genreEl)

    vinylEl.append(imageEl)
    vinylEl.append(vinylTextEl)

    vinylListEl.append(vinylEl)

  }

}