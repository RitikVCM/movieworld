let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <a href="${getWikipediaUrl(data.Title)}" target="_blank">
                    <img src=${data.Poster} class="poster">
                </a>
                <div>
                    <h2>
                        <a href="${getWikipediaUrl(data.Title)}" target="_blank">
                            ${data.Title}
                        </a>
                    </h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;
        } else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

// Helper function to generate Wikipedia URL
const getWikipediaUrl = (movieTitle) => {
  const formattedTitle = movieTitle.replace(/\s/g, '_');
  return `https://en.wikipedia.org/wiki/${formattedTitle}`;
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
