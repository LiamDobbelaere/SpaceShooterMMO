$(document).ready(function() {
    $.ajax({
        url: "/api/regions",
        method: "GET"
    }).done(function(regions) {
        var table = $("#map");
        var i = 0;
        var speed = 6;

        for(var y = 0; y < 20; y++) {  //iterate over every pixel in the canvas
            var $newTr = $("<tr></tr>");

            for (var x = 0; x < 20; x++) {  //iterate over every pixel in the canvas
                i++;

                var $newTd = $("<td></td>");
                var isSet = false;

                regions.forEach(function (region) {
                    if (region.x === x && region.y === y) {
                        isSet = true;

                        if (region.faction === "TRRA") {
                            (function(td) {
                                setTimeout(function() {
                                    setGridColor(td, "blue");
                                }, i * speed);
                            })($newTd);
                        } else if (region.faction === "BOLT") {
                            (function(td) {
                                setTimeout(function() {
                                    setGridColor(td, "red");
                                }, i * speed);
                            })($newTd);
                        } else if (region.faction === "H3-RB") {
                            (function(td) {
                                setTimeout(function() {
                                    setGridColor(td, "lime");
                                }, i * speed);
                            })($newTd);
                        }
                    }
                });

                if (!isSet) {
                    (function(td) {
                        setTimeout(function() {
                            setGridColor(td, "white");
                        }, i * speed);
                    })($newTd);
                }

                $newTr.append($newTd);
            }

            table.append($newTr);
        }
    })
});

function setGridColor(td, color) {
    td.css("background-color", color);
    td.css("transform", "scale(1)");
    td.css("box-shadow", "none");
}