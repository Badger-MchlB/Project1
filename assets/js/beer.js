// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});

//during initial site load, we need to hide the place holder card for brewery information
$("#brewery-information").hide();
$("#brewery-iframe").hide();
$("#gmap-iframe").hide();

    var breweryArray = [];
    var searchResults = [];
    var searchState = "";
    var searchBrewery = "";
    var breweryId = "";
    var breweryName = "";
    var favCount = 0;
    
    // creating variables for storage use later
    var favIdArray = [];
    var favNameArray = [];
    var newFavoriteId = ""
    var newFavoriteName = ""

    getLocalStorageFavs();
// This function handles events where search state button is clicked

$("#state-search").on("click", function(event) {
    console.log("search state button click")

    //hide the place holder card for brewery information that may be on screen still
    $("#brewery-information").hide();
    $("#brewery-iframe").hide();
    $("#gmap-iframe").hide();

    searchBrewery = ""
    searchState = $("#state-input").val().trim();
    console.log("search state chosen is ",searchState);


    console.log ("we will search for the state of ", searchState);   
    
    searchTriggered(searchState,searchBrewery)

});

// This function handles events where search brewery button is clicked

$("#brewery-search").on("click", function(event) {
    console.log("search brewery button click")

    //hide the place holder card for brewery information that may be on screen still
    $("#brewery-information").hide();
    $("#brewery-iframe").hide();
    $("#gmap-iframe").hide();

    searchState = ""
    searchBrewery = $("#brewery-input").val().trim();
    console.log("search brewery chosen is ",searchBrewery);


    console.log ("we will search for a brewery named ", searchBrewery);   
    
    searchTriggered(searchState,searchBrewery)

});
        //api.openbrewerydb.org/breweries?by_state=
        //api.openbrewerydb.org/breweries?by_name=cooper
        
    function searchTriggered(arg1,arg2) {
        
        //clear any left over buttons from previous searches
        $("#brewery-view").empty();

        console.log ("In the search function and we will search for a brewery named ", searchBrewery);  

            var queryURL = "https://api.openbrewerydb.org/breweries?by_name=" + arg2 + "&by_state=" + arg1
            console.log("the URL is ",queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            console.log("full response from ajax call is ",response);
            
            //after search, need to hide the place holder image
            $("#beerPlaceHolderImg").hide();
            
            // var breweryArray = []
            for(i=0; i<response.length; i++){                
                
                breweryId = (response[i].id)
                breweryName = (response[i].name);
                
                //now we want to add buttons for each brewery name found
                
                // dynamicaly generating buttons for each name in the array.
                var a = $("<button>");
          
                // Adding a class
                a.addClass("breweryFromSearch");
          
                // Adding a data-attribute with a value of the brewery at index i
                a.attr("data-name", breweryId);
          
                // Providing the button's text with a value of the movie at index i
                a.text(breweryName);
          
                // Adding the button to the HTML
                $("#brewery-view").append(a);

             } //this is where the for loop ends 

        
    });
};

// on click function to go to specific brewery based on button click after user has performed the search

// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".breweryFromSearch", displayBreweryInfo);

// Function for retrieving the brewery name from the data-attribute
function displayBreweryInfo () {
    //clear all the buttons from previous search
    $("#brewery-view").empty();

    //also hide the beer definition card
    $("#beer-definition").hide();
   
    var breweryId = $(this).attr("data-name");
    var queryURL = "https://api.openbrewerydb.org/breweries/" + breweryId

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
                    
        $("#brewery-display-name").text(response.name)
        $("#brewery-display-url").text(response.website_url)
        $("#brewery-display-street").text(response.street)
        $("#brewery-display-city").text(response.city)
        $("#brewery-display-state").text(response.state)
        $("#brewery-display-zip").text(response.postal_code)
        $("#brewery-display-phone").text(response.phone)

        $("#brewery-iframe").attr("src",response.website_url)

        var breweryMap = ("https://www.google.com/maps/embed/v1/view?key=AIzaSyDoygSTcYKM21ddzXrhhlMw5NAyhEADjRg&center="+response.latitude+","+response.longitude+"&zoom=18");

        $("#gmap-iframe").attr("src",breweryMap)
        console.log("gmap url is ",breweryMap);


            $("#brewery-information").show();
            $("#brewery-iframe").show();
            $("#gmap-iframe").show();            

});


  }


// click event to store current brewery to favorites
$("#saveFav").on("click", function(event) {
    console.log("save to favorites button clicked")
    console.log("brewery id is ",breweryId)
    console.log("brewery name is ",breweryName)


    favIdArray.push(breweryId);
    favNameArray.push(breweryName);
    // newFavoriteName = breweryName


    // Store the username into localStorage using "localStorage.setItem"
    localStorage.setItem("favoriteBreweryName", favNameArray);
    localStorage.setItem("favoriteBreweryId", favIdArray);


});


// function to load favorites to buttons on page

function getLocalStorageFavs(){

    favIdArray = localStorage.getItem("favoriteBreweryId");
    favNameArray = localStorage.getItem("favoriteBreweryName");

    console.log("this is the stored favorites id array ",favIdArray)
    console.log("this is the stored favorites names array ",favNameArray)

            // var breweryArray = []
            for(i=0; i<favIdArray.length; i++){  

                
                breweryId = favIdArray;
                breweryName = favNameArray;
                
                //now we want to add buttons for each brewery name found
                
                // dynamicaly generating buttons for each name in the array.
                var a = $("<button>");
          
                // Adding a class
                a.addClass("breweryFromSearch");
          
                // Adding a data-attribute with a value of the brewery at index i
                a.attr("data-name", breweryId);
          
                // Providing the button's text with a value of the movie at index i
                a.text(breweryName);
          
                // Adding the button to the HTML
                $("#favorites").append(a);

             } //this is where the for loop ends 
  



}