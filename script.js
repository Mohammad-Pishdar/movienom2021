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
            resultsList.append(`<li>${value.Title}</li>`);
        })
    })
}

movieSearchButton.on('click', function (e) {
    e.preventDefault();
    movieTitle = movieSearchBox.val();
    movieSearch();
});

