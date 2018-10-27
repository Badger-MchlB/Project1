$('.carousel').carousel('next')
$('.carousel').carousel('prev')

$('#myCarousel').on('slide.bs.carousel', function () {
    console.log("inside carousel")
})

var queryURL = "https://api.openbrewerydb.org/breweries?page=2&per_page=30"
console.log("ready")

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    
    console.log(response)

for(i=0; i<response.length; i++){
    var newDiv = $("<div>")
        var dname = $("<p class='name-div'>").text(response[i].name)
            newDiv.append(dname)

         var dstreet = $("<p class='street-div'>").text(response[i].street)
            newDiv.append(dstreet)

        var dcity = $("<p class='city-div'>").text(response[i].city)
            newDiv.append(dcity)

        var dstate = $("<p class='state-div'>").text(response[i].state)
            newDiv.append(dstate)

        var dpostal_code = $("<p class='postal_code-div'>").text(response[i].postal_code)
            newDiv.append(dpostal_code)

        var dcountry = $("<p class='country-div'>").text(response[i].country)
            newDiv.append(dcountry)

        var dphone = $("<p class='phone-div'>").text(response[i].phone)
            newDiv.append(dphone)

        var dwebsite_url = $("<p class='website_url-div'>").text(response[i].website_url)
            newDiv.append(dwebsite_url)

    $("#artistArtwork").append(newDiv)
    
}
})