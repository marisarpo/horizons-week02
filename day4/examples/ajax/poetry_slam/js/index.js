// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
    url: 'https://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function (resp) {
        let count = resp.split(" ").length;
        $('#count').text(count);
    }

});