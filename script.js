const movieSearchBox = $('#movieSearchInputBox');
const movieSearchButton = $('#movieSearchButton');
let movieTitle;

function movieSearch() {
    $.ajax({
        url: `http://www.omdbapi.com/?s=${movieTitle}&type=movie&apikey=3b9b8938`,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
}

movieSearchButton.on('click', function (e) {
    e.preventDefault();
    movieTitle = movieSearchBox.val();
    movieSearch();
});

