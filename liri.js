
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var axios = require("axios");

var moment = require("moment");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);


var concertThis = function(artist) {

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(

        function(response) {

            var data = response.data;

            console.log(artist + " will be playing in: ");

            for(var i = 0; i > data.length; i++) {

                console.log(data[i].venue.city + ", " + data[i].venue.region + " at ");

                console.log(data[i].venue.name + " on ");

                console.log(data[i].datetime);

            }

        }
    
    );

};

var fixArtist = function(artist) {
    return artist.name;
};

var spotifyThis = function(song) {
    if(song === undefined) {
        song === "The Sign";
    }

    spotify.search(
        {
            type: "track",
            query: song
        },
        function(err, data) {
            if(err) {
                console.log(err);
                return;
            }

            var songList = data.tracks.items;
            
            for(var i = 0; i < 5; i++) {
                
                console.log("Song: " + songList[i].name);
                console.log("Artist(s): " + songList[i].artists.map(fixArtist));
                console.log("Album: " + songList[i].album.name);
                
                if(songList[i].preview_url === null) {
                    console.log("Spotify couldn't find that song :(");
                }
                else {
                    console.log("Listen here =>> " + songList[i].preview_url);
                }

                console.log("\n----------------------------------------------------\n");
                
            }
        }
    )
};

var movieThis = function(movie) {
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
};

spotifyThis("What's my age again");