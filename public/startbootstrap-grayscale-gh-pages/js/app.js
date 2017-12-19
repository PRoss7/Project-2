function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function(e, r) { return t[n][r] }) } return res }

$(function() {

    var searchCategory;

    $("form").on("submit", function(e) {
        console.log("success");
        e.preventDefault();
        $("#results").empty();
        // prepare the request
        var request = gapi.client.youtube.search.list({

            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#mediaInput").val() + " trailer").replace(/%20/g, "+"),
            maxResults: 1,
        });
        // execute the requests
        request.execute(function(response) {
            //console.log(response);
            var results = response.result;
            //$("#results").html("");
            $.each(results.items, function(index, item) {
                $.get("startbootstrap-grayscale-gh-pages/tpl/item.html", function(data) {
                    $("#results").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));

                });

            });
            //   $.get("tpl/item.html", function(data) {
            //       $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
            //  $("#results").append(item.id.videoId+" "+item.snippet.title+"<br>");
            //   });
            // });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);

    $("#searchDropdown li").on("click", function() {

        $("#search").removeAttr("disabled");
        $("#addToList").removeAttr("disabled");
        searchCategory = $(this).attr("data-category");

        //alert(searchCategory);

    });

    $(".dropdown a").on("click", function() {

        $("button", $(this).parent().parent().parent()).html($(this).html());

    });

    // $("#addToList").on("click", function (event, data) {

    //     $("#wishListTable").find("tbody")
    //         .append($("<tr>" + + "</tr>")
    //             .append($("<tr>" + $("#mediaInput").val().trim() + "</tr>"))
    //             .append($("<tr>" + + "</tr>"))
    //             .append($("<tr>" + + "</tr>"))
    //             .append($("<tr>" + searchCategory + "</tr>"))
    //             .append($(`<td> <button type="button" id="addToViewed" class="btn btn-primary"> <i class="fa fa-check" aria-hidden="true"> </i> </button> </td>`)
    //                 .append($(`<td> <button type="button" id="addToDelete" class="btn btn-danger"> <i class="fa fa-trash" aria-hidden="true"></i> </button> </td>`)
    //                 )
    //             )
    //         );

    // });

});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9 / 16);
}

function init() {
    gapi.client.setApiKey("AIzaSyA388q_XO6_LZrxMTfw41reoBplb--6tds");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
};

$(document).ready(function() {
    $("#addToList").click(function() { //adds to wishlist table
        event.preventDefault();
        console.log("wishlist button fired");
        //mediaInput is placeholder for OMBD object
        var newMedia = {
            Title: $("#mediaInput").val().trim(),
            Rating: $("#mediaInput").val().trim(),
            Genre: $("#mediaInput").val().trim(),
            Media: $("#mediaInput").val().trim()
        };

        console.log(newMedia);
        $.ajax("/media/add", {
            type: "POST",
            data: newMedia
        }).then(
            function() {
                console.log("added to wishlist table");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});

//below this line may not work

$("#addToViewed").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMedia = {
        Title: $("#").val().trim(),
        Rating: $("#").val().trim(),
        Genre: $("#").val().trim(),
        Media: $("#").val().trim()
    };

    // Send the POST request.
    $.ajax("/media/:id/move", {
        type: "POST",
        data: newMedia
    }).then(
        function() {
            console.log("added to viewed table");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

$("#deleted-section").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMedia = {
        Title: $("#").val().trim(),
        Rating: $("#").val().trim(),
        Genre: $("#").val().trim(),
        Media: $("#").val().trim()
    };

    // Send the POST request.
    $.ajax("/media/:id/delete", {
        type: "POST",
        data: newMedia
    }).then(
        function() {
            console.log("deleted from wishlist table");
            // Reload the page to get the updated list
            location.reload();
        }
    );

});