const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTAzZTcxZGNmYzg3NDE0NWE1NzA1NDhjN2VmMGVjYiIsInN1YiI6IjY1MzBkMzg3YWVkZTU5MDBhYzAxMmU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h1PNbxZpJnWwAa8JF6zQlff-bMh0lPHq6vt9VXfDUAQ",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    data["results"].forEach((movie) => {
      let id = movie["id"];
      let title = movie["title"];
      let overview = movie["overview"];
      let poster_path =
        "https://image.tmdb.org/t/p/w500" + movie["poster_path"];
      let vote_average = movie["vote_average"];

      let newDiv = document.createElement("div");
      newDiv.innerHTML = `
      <div class="movie">
      <img src=${poster_path}>
      <div class="movie_title"><p>${title}</p></div>
      <div class="movie_rating"><p>Rating : ${vote_average}</p></div>
      <div class="movie_overview"><p>${overview}</p></div>
      </div>
      `;

      newDiv.addEventListener("click", function () {
        window.alert("영화 id : " + id);
      });

      movieCard.appendChild(newDiv);
    });
  });

const movieCard = document.getElementById("movie_card");
const searchTitle = document.querySelector(".txt_search");

function handleSearch(event) {
  event.preventDefault();

  const searchTitleTerm = searchTitle.value.trim();

  if (searchTitleTerm !== "") {
    movieCard.innerHTML = "";

    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en&page=1",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        let filteredRows = data["results"].filter((a) =>
          a.title.toUpperCase().includes(searchTitleTerm.toUpperCase())
        );

        filteredRows.forEach((movie) => {
          let id = movie["id"];
          let title = movie["title"];
          let overview = movie["overview"];
          let poster_path =
            "https://image.tmdb.org/t/p/w500" + movie["poster_path"];
          let vote_average = movie["vote_average"];

          let newDiv = document.createElement("div");
          newDiv.dataset.id = id;
          newDiv.innerHTML = `
          <div class="movie">
          <img src=${poster_path}>
          <div class="movie_title"><p>${title}</p></div>
          <div class="movie_rating"><p>Rating : ${vote_average}</p></div>
          <div class="movie_overview"><p>${overview}</p></div>
          </div>
          `;

          newDiv.addEventListener("click", function () {
            window.alert("영화 id : " + this.dataset.id);
          });

          movieCard.appendChild(newDiv);
        });
      });
  }
}
