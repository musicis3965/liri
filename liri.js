//commands: node liri.js
// -------- ----------- spotify-this-song 'song name'
// -------- ----------- movie-this 'movie name'
//js
require("dotenv").config()
//Here are all the things required for liri to run
var request = require("request");
var key = require("./keys.js");
var spotifyAPI = require("node-spotify-api");

//specifying the 'type of search' we are doing, holding the third
//spot in our array of the terminal input
var query = process.argv[2];
// passing what's being searched for into our array, after the 'type of search' we specified above
// holding the fourth spot in our array
var content = process.argv[3];
// new variable holding the movie search, passing it int o our 'content' variable as specified earlier 
var moovie = content;

//Run through the array, adding our items to the search
for ( let i=4; i<process.argv.length; i++ ) {
    content += " " + process.argv[i];
    moovie += "+" + process.argv[i];
}
//This function runs the search into the spotify API
spotify = function(q) {
    var spotify = new spotifyAPI ({
        id: key.spotify.id,
        secret: key.spotify.secret
        });
    spotify.search({
    type: "track", 
    query: q,
    }, function(err, search) {
        console.log(search.tracks.items[0].name + " By: "+ search.tracks.items[0].artists[0].name);
        console.log("Album: " + search.tracks.items[0].album.name);
        console.log("Spotify Link: " + search.tracks.items[0].preview_url);
        });
        },

//This function runs the search into the OMDB
    movies = function(q) {
    let movieSearch = "http://www.omdbapi.com/?apikey=trilogy&t=" + q,
        results = {
        url: movieSearch,
        method: "GET",
        }
    request(results, function(err, response, answers) {        
                var movie = JSON.parse(answers)
                console.log("Title: " + movie.Title)
                console.log("Release Year: " + movie.Year)
                console.log("Rating: " + movie.Rated)
                console.log("Actors: " + movie.Actors)
                console.log("Plot: " + movie.Plot)
                
                
            })
};

// if else statement to run the commands
if ( query === "spotify-this-song" ) {
    spotify(content);
} else {( query === "movie-this" );
    movies(moovie);
}
