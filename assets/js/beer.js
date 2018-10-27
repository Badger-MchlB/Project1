
        // $('.carousel').carousel('next')
        // $('.carousel').carousel('prev')

        // $('#myCarousel').on('slide.bs.carousel', function () {
        //     console.log("inside carousel")
        // })
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

        var searchResults   
        var searchState = "OH"
        var searchBrewery = ""
        var pageNumber = "1"
        //api.openbrewerydb.org/breweries?by_state=
        //api.openbrewerydb.org/breweries?by_name=cooper
        var queryURL = "https://api.openbrewerydb.org/breweries?by_name=" + searchBrewery + "&by_state" + searchState
        console.log("ready")
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            
            // console.log(response);
            
            
            var breweryArray = []
            for(i=0; i<response.length; i++){
                // console.log("in the for loop");
                
                let breweryObj = {
                  "breweryName": [response[i].name],
                  "breweryStreet": [response[i].street],
                  "breweryCity": [response[i].city],
                  "breweryState": [response[i].state],
                  "breweryZip": [response[i].postal_code],
                  "breweryPhone": [response[i].phone],
                  "breweryUrl": [response[i].website_url],
                  "breweryLongitude": [response[i].longitude],
                  "breweryLatitude": [response[i].latitude],
                }
                console.log(breweryObj);

                // breweryArray[i] = [breweryName, breweryStreet, breweryState, breweryCity, breweryZip, breweryPhone, breweryUrl, breweryLongitude, breweryLatitude];
                
                // console.log(breweryArray[i])
            }

                //     var newDiv = $("<div>")
        //         var dname = $("<p class='name-div'>").text(response[i].name)
        //             newDiv.append(dname)

        //          var dstreet = $("<p class='street-div'>").text(response[i].street)
        //             newDiv.append(dstreet)

        //         var dcity = $("<p class='city-div'>").text(response[i].city)
        //             newDiv.append(dcity)

        //         var dstate = $("<p class='state-div'>").text(response[i].state)
        //             newDiv.append(dstate)

        //         var dpostal_code = $("<p class='postal_code-div'>").text(response[i].postal_code)
        //             newDiv.append(dpostal_code)

        //         var dcountry = $("<p class='country-div'>").text(response[i].country)
        //             newDiv.append(dcountry)

        //         var dphone = $("<p class='phone-div'>").text(response[i].phone)
        //             newDiv.append(dphone)

        //         var dwebsite_url = $("<p class='website_url-div'>").text(response[i].website_url)
        //             newDiv.append(dwebsite_url)

        //     $("#artistArtwork").append(newDiv)
            
        // console.log(breweryArray);
        // searchResults = breweryArray
    })

        });


        // console.log("search results are ",searchResults);