$(document).ready(function () {

    var cars = ["lamborghini", "ferrari", "camaro", "mercedes", "mustang"]

    function carBtnfunction(){
        $("#carButtons").empty()
        for (var i = 0; i < cars.length; i++) {
        var carsbutton = $("<button>").attr("car-name", cars[i]).text(cars[i]).addClass("btn");
        $("#carButtons").append(carsbutton);
        }

    }
    $("#addCar").on("click", function(){
        event.preventDefault();
        var newCar = $("#car-input").val().trim();
        console.log(newCar);
        cars.push(newCar);
        carBtnfunction();
});
    $(document).on("click", ".image", function () {
    var state = $(this).attr("data-state")
    console.log("image was clicked ")
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    }
    else{
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
});

    $(document).on("click", ".btn", function () {
        var car = $(this).attr("car-name")
        console.log(car);


        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            car + "&api_key=ehvY0iFwzBwSXAba8jGxWeSWmUSGFSCS&limit=9";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {
                $("#cargifs").empty(); 
                console.log(response);
                for (var i = 0; i < response.data.length; i++) {
                    
                    var gifRating = $("<p>").text("Rating: " + response.data[i].rating);
                    

                    if (response.data[i].rating !== "r") {
                        var gifDiv = $("<div class='item'>");
                        var carImage = $("<img>");

                        carImage.attr("src", response.data[i].images.fixed_height_small_still.url);
                        carImage.attr("data-still", response.data[i].images.fixed_height_small_still.url); 
                        carImage.attr("data-animate",response.data[i].images.fixed_height_small.url); 
                        carImage.attr("data-state", "still"); 
                        carImage.addClass("image");

                        gifDiv.append(carImage);
                        gifDiv.append(gifRating);

                        $("#cargifs").prepend(gifDiv);



                    }
                }

        


            });




    });

    carBtnfunction();

});
