let API = "https://www.omdbapi.com/?apikey=b2647f6f&t=";
let loadingStatus = false;
let loader = document.getElementById("loader");
let movieName = document.getElementById("movieName");
let movieContainer = document.getElementById("movieContainer");
let errorContainer = document.getElementById("errorContainer");
movieContainer.classList.add("d-none");
errorContainer.classList.add("d-none");

function renderMovie() {
  if (loadingStatus == true) {
    loader.classList.add("loader");
  } else {
    loader.classList.remove("loader");
  }
}

function fetchMovieDetails() {
  let apiQuery = API + movieName.value;
  loadingStatus = true;
  renderMovie();

  fetch(apiQuery)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      if (movieName.value == "") {
        loadingStatus = false;
        renderMovie();
      } else {
        if (data.Error == "Movie not found!") {
          movieContainer.classList.add("d-none");
          errorContainer.classList.remove("d-none");
          loadingStatus = false;
          renderMovie();
          movieName.value = "";
        } else {
          movieContainer.classList.remove("d-none");
          errorContainer.classList.add("d-none");

          title.innerText = data.Title;
          genre.innerText = data.Genre;
          movieImg.src = data.Poster;
          desc.innerText = data.Plot;
          actors.innerText = data.Actors;
          director.innerText = data.Director;
          imdb.innerText = data.Ratings[0].Value;
          awards.innerText = data.Awards;
          boxOffice.innerText = data.BoxOffice;
          movieTime.innerText = data.Runtime;
          writer.innerText = data.Writer;
          releaseDate.innerText = data.Released;

          movieName.value = "";
          console.log(data);

          loadingStatus = false;
          renderMovie();
        }
      }
    });
}
