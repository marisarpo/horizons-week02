// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$(document).ready(function() {
    $.ajax({
        url: "http://horizons-json-cors.s3.amazonaws.com/poem.txt",
        success: function(response){
            var poem = response.split(" ");
            var count = 0;
            _.forEach(poem, function(value, key) {
                count++;
            });
            $('span#count').empty().append(count);
        }
    })
});
