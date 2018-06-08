// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$(document).ready(function() {
    $.ajax({
        method: 'get',
        url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
        success: function(resp) {
            var poem = resp.split(' ');
            $('#count').text(poem.length);
        }
    })
});