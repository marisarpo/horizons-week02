$.ajax("https://horizons-school-of-technology.github.io/week02/day4/examples/poem.txt")
        .done(function(data) {
    $("#count").text(data.split(" ").length);
});
