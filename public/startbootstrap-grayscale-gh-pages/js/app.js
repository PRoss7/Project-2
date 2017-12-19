
function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }




$(function () {


    var searchCategory;
    var mediaId = 1;

    $("form").on("submit", function (e) {
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
        // execute the request
        request.execute(function (response) {
            //console.log(response);
            var results = response.result;
            //$("#results").html("");
            $.each(results.items, function (index, item) {
                $.get("startbootstrap-grayscale-gh-pages/tpl/item.html", function (data) {
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

    $("#searchDropdown li").on("click", function () {


        $("#search").removeAttr("disabled");
        $("#addToList").removeAttr("disabled");
        searchCategory = $(this).attr("data-category");


        //alert(searchCategory);

    });

    $(".dropdown a").on("click", function () {

        $("button", $(this).parent().parent().parent()).html($(this).html());

    });

    $("#addToList").on("click", function (event, data) {


        $.ajax('/search', {
            type: "POST",
            dataType: 'json',
            data: {
                'search': $('#mediaInput').val().trim()
            }
        }).done(function (data) {
            console.log("movie data: ", data); //Movie data is here

            var button1 = $('<button type = "button" id = "addToViewed" class= "btn btn-primary"> <i class="fa fa-check" aria-hidden="true"> </i> </button>');
            var button2 = $('<button type="button" id="addToDelete" class="btn btn-danger"> <i class="fa fa-trash" aria-hidden="true"></i> </button>');
            //viewed button on the tables
            button1.on('click', function () {
                //alert(data.id + ' was clicked');
                $(this).parent().parent().appendTo($('.viewedTable tbody'))
            });
            //
            button2.on('click', function () {
                //alert(data.id + ' was clicked');
                $(this).parent().parent().appendTo($('.deletedTable tbody'))
            });

            var row = $("<tr></tr>");

            row.append($("<td>" + mediaId + "</td>"));
            mediaId++;
            row.append($("<td>" + data.title + "</td>"));
            row.append($("<td>" + data.vote_average + "/10" + "</td>"));
            //row.append($("<td>" + data.genre_ids[0] + "</td>")); // Need another API call to get genre name
            row.append($("<td>" + searchCategory + "</td>"));
            //row.append($("<td>" + 'youtube link' + "</td>"));
            row.append($(`<td></td>`).append(button1));
            row.append($(`<td></td>`).append(button2));

            $(".wishListTable tbody").append(row);


            // Reload the page to get the updated list
            //location.reload();
        }
            );

    });

});

function resetVideoHeight() {

    $(".video").css("height", $("#results").width() * 9 / 16);

}

function init() {

    gapi.client.setApiKey("AIzaSyA388q_XO6_LZrxMTfw41reoBplb--6tds");
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
    });

};

$(document).ready(function () {

    $("#addToList").click(function (event, data) { //adds to wishlist table
        event.preventDefault();
        console.log("wishlist button fired");
        //mediaInput is placeholder for OMBD object
        var newMedia = {
            Title: $(data.title).val().trim(),
            Rating: $(data.vote_average).val().trim(),
            Genre: $(data.genre_ids[0]).val().trim(),
            Media: $(searchCategory).val().trim()
        };

        console.log(newMedia);
        $.ajax("/media/add", {
            type: "POST",
            data: newMedia
        }).then(
            function () {
                console.log("added to wishlist table");
                // Reload the page to get the updated list
                location.reload();
            }
            );

    });

});

//below this line may not work

$("#addToViewed").on("submit", function (event, data) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMedia = {
        Title: $(data.title).val().trim(),
        Rating: $(data.vote_average).val().trim(),
        Genre: $(data.genre_ids[0]).val().trim(),
        Media: $(searchCategory).val().trim()
    };

    // Send the POST request.
    $.ajax("/media/:id/move", {
        type: "POST",
        data: newMedia
    }).then(
        function () {
            console.log("added to viewed table");
            // Reload the page to get the updated list
            location.reload();
        }
        );

});

$("#deleted-section").on("submit", function (event, data) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newMedia = {
        Title: $(data.title).val().trim(),
        Rating: $(data.vote_average).val().trim(),
        Genre: $(data.genre_ids[0]).val().trim(),
        Media: $(searchCategory).val().trim()
    };

    // Send the POST request.
    $.ajax("/media/:id/delete", {
        type: "POST",
        data: newMedia
    }).then(
        function () {
            console.log("deleted from wishlist table");
            // Reload the page to get the updated list
            location.reload();
        }
        );

});

