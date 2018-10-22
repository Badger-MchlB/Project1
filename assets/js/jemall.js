// $.getJSON(
//     'https://api.unsplash.com/photos/random?count=10&client_id=86a41cb71c29dc629f1a4ae0c17d467526ab93d5ba4e1053fd8b71f3d9ab314c', function(data){
//    console.log(data);
// })

    // Example queryURL for Giphy API
    // var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
    //var queryURL = "https://api.giphy.com/v1/gifs/search?q=cheesburgrers&api_key=dc6zaTOxFJmzC";
    // var resourceType = "classification?"
    var resourceType = "person?"
    var sort = "sort=alphasort"
    var searchCount = "10"
    var apiKey = "&apikey=6155ec40-d485-11e8-b56a-fb26bb8bf14a"
    var queryURL = "https://api.harvardartmuseums.org/" + resourceType + sort + apiKey


$.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
      console.log(response);
      // console.log(response.data[9].images.preview_gif.url)
      // var something = $("<img>")
      // something.attr("src", response.data[9].images.preview_gif.url)

    //    $("body").append(something);
    });



    //*** this is just some detail on the harvard museum api */
// Harvard Art Museums API. Here is your key.
// 6155ec40-d485-11e8-b56a-fb26bb8bf14a

// https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=YOUR_API_KEY

// https://api.harvardartmuseums.org/classification?apikey=6155ec40-d485-11e8-b56a-fb26bb8bf14a