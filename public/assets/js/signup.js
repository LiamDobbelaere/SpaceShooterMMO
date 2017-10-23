$(document).ready(function() {
    $("#signup-ask").on("click", function() {
        $("#signup-ask").hide();
        $("#login").hide();
        $("#signup").fadeIn(500);
    });
});