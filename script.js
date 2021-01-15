$(document).ready(function () {
    //dom not only ready, but everything is loaded
    const movieSearchBox = $('#movieSearchInputBox');
    const movieSearchButton = $('#movieSearchButton');
    const nominationList = $('.nomination-list');
    const results = $('.container');
    let heartIcon;
    let deleteX;
    let movieTitle;
    let nominationListArray = [];

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
                        <img src="https://via.placeholder.com/300x451?text=Image+Not+Found" alt="${value.Title} Image not found" width="300" height="300">
                        <div class="overlay">
                            <a href="#" class="icon" title="Nominate This Movie!">
                            <i class="fas fa-heart fave-btn"></i>
                            </a>
                        </div>
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
                        <img src=${value.Poster} alt=${value.Title} width="300" height="300">
                        <div class="overlay">
                            <a href="#" class="icon" title="${value.Title} (${value.Year})">
                            <i class="fas fa-heart fave-btn"></i>
                            </a>
                        </div>
                        <div class="image-container">
                            <h4><b>${value.Title}</b> (${value.Year})</b></h4>
                        </div> 
                        <div class="image-card-btns">
                            <button class="imdb-btn" type="button" onclick=" window.open('https://www.imdb.com/title/${value.imdbID}/','_blank')"><span>IMDb</span></button>
                        </div>
                    </div>
                </div>`);
                }
            });

            heartIcon = $('.icon');

            heartIcon.click(function (e) {
                e.preventDefault();
                if (jQuery.inArray(e.currentTarget.title, nominationListArray) === -1 && nominationListArray.length < 5) {
                    nominationList.append(`
                <li>${e.currentTarget.title}<span class="close">&times;</span></li>
                `)
                    nominationListArray.push(e.currentTarget.title);
                } else {
                    alert("Item already added to the nomination list.")
                    return;
                }
                if (nominationListArray.length > 5) {
                    alert("You reached the maximum of 5 nominations. In order to add this item, please remove one of the old items first.");
                    return;
                }

                deleteX = $('.close');

                deleteX.click(function(e){
                    e.preventDefault();
                    let itemToBeRemoved = e.currentTarget.parentElement.textContent.slice(0,-1);
                    e.currentTarget.parentElement.remove();
                    //removing the item from the list of items so you can add it again if you wish
                    nominationListArray = jQuery.grep(nominationListArray, function(value) {
                        return value != itemToBeRemoved;
                    })
                })
            });

            

        })
    }

    movieSearchButton.on('click', function (e) {
        e.preventDefault();
        //ensuring that previous search results disappear as soon as we do a new search
        results.html("");
        movieTitle = movieSearchBox.val();
        movieSearch();
    });
});