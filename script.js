const movieSearchBox = $('#movieSearchInputBox');
const movieSearchButton = $('#movieSearchButton');
const results = $('.container');
let movieTitle;

function movieSearch() {
    $.ajax({
        url: `http://www.omdbapi.com/?s=${movieTitle}&type=movie&apikey=3b9b8938`,
        method: "GET"
    }).then(function (response) {
        $.each(response.Search, function (key, value) {
            if (value.Poster === "N/A") {
                results.append(`
                <div class="responsive">
                    <div class="gallery">
                        <img src="https://via.placeholder.com/300x451?text=Image+Not+Found" alt="${value.Title} Image not found" width="300" height="427">
                        <div class="image-container">
                            <h4><b>${value.Title}</b> (${value.Year})</b></h4> 
                        </div> 
                        <div class="image-card-btns">
                            <button class="imdb-btn" type="button" onclick=" window.open('https://www.imdb.com/title/${value.imdbID}/','_blank')"><span>IMDb</span></button>
                        </div>
                    </div>
                </div>`);
            } else {
                results.append(`
                <div class="responsive">
                    <div class="gallery">
                        <img src=${value.Poster} alt=${value.Title} width="300" height="427">
                        <div class="image-container">
                            <h4><b>${value.Title}</b> (${value.Year})</b></h4>
                        </div> 
                        <div class="image-card-btns">
                            <button class="imdb-btn" type="button" onclick=" window.open('https://www.imdb.com/title/${value.imdbID}/','_blank')"><span>IMDb</span></button>
                        </div>
                    </div>
                </div>`);
            }
        })
    })
}

movieSearchButton.on('click', function (e) {
    e.preventDefault();
    //ensuring that previous search results disappear as soon as we do a new search
    results.html("");
    movieTitle = movieSearchBox.val();
    movieSearch();
});
