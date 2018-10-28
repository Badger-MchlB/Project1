// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
});

//during initial site load, we need to hide the place holder card for brewery information
$("#brewery-information").hide();
$("#brewery-iframe").hide();

    var breweryArray = []
    var searchResults = []
    var searchState = ""
    var searchBrewery = ""

// This function handles events where search state button is clicked

$("#state-search").on("click", function(event) {
    console.log("search state button click")

    //hide the place holder card for brewery information that may be on screen still
    $("#brewery-information").hide();
    $("#brewery-iframe").hide();

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
                
                var breweryId = (response[i].id)
                var breweryName = (response[i].name);
                // var breweryStreet = (response[i].street);
                // var breweryCity = (response[i].city);
                // var breweryState = (response[i].state);
                // var breweryZip = (response[i].postal_code);
                // var breweryPhone = (response[i].phone);
                // var breweryUrl = (response[i].website_url);
                // var breweryLongitude = (response[i].longitude);
                // var breweryLatitude = (response[i].latitude);

                // breweryArray[i] = [breweryId, breweryName, breweryStreet, breweryState, breweryCity, breweryZip, breweryPhone, breweryUrl, breweryLongitude, breweryLatitude];
                
                // searchResults.push(breweryArray[i]);
                
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

        test(breweryArray)
        
    });
};

// on click function to go to specific brewery based on button click after user has performed the search

// $(".movies").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".breweryFromSearch", displayBreweryInfo);

// Generic function for capturing the movie name from the data-attribute
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
        
        console.log("Response from ajax call is ",response);
        console.log("brewry name is ",response.name)
        console.log("brewry street is ",response.street)
        console.log("brewry city is ",response.city)
        console.log("brewry state is ",response.state)
        console.log("brewry zip is ",response.postal_code)
        console.log("brewry phone is ",response.phone)
        console.log("brewry url is ",response.website_url)
                    
        $("#brewery-display-name").text(response.name)
        $("#brewery-display-url").text(response.website_url)
        $("#brewery-display-street").text(response.street)
        $("#brewery-display-city").text(response.city)
        $("#brewery-display-state").text(response.state)
        $("#brewery-display-zip").text(response.postal_code)
        $("#brewery-display-phone").text(response.phone)

        $("#brewery-iframe").attr("src",response.website_url)

            // var breweryLongitude = (response.longitude);
            // var breweryLatitude = (response.latitude);

            $("#brewery-information").show();
            $("#brewery-iframe").show();
    



});


  }


function test(arg){
    console.log("OH!!! HERE IS THE ARRAY", arg)
}


// console.log("search results are ",searchResults);
