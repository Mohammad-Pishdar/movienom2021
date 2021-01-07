const movieSearchBox = $('#movieSearchInputBox');
const movieSearchButton = $('#movieSearchButton');
let movieTitle;

movieSearchButton.on('click',function(e) {
    e.preventDefault();
    movieTitle = movieSearchBox.val();
    console.log(movieTitle);
} );

