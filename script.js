const movieSearchBox = $('#movieSearchInputBox');
const movieSearchButton = $('#movieSearchButton');
const resultsList = $('#resultsList');
let movieTitle;

function movieSearch() {
    $.ajax({
        url: `http://www.omdbapi.com/?s=${movieTitle}&type=movie&apikey=3b9b8938`,
        method: "GET"
    }).then(function (response) {
        $.each(response.Search, function (key, value) {
            console.log(value.Title);
            resultsList.append(`<li><img src=${value.Poster} alt=${value.Title} width="300" height="451">${value.Title}</li>`);
        })
    })
}

movieSearchButton.on('click', function (e) {
    e.preventDefault();
    //ensuring that previous search results disappear as soon as we do a new search
    resultsList.html("");
    movieTitle = movieSearchBox.val();
    movieSearch();
});

