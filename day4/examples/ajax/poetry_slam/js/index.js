// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
var count;
$.ajax({
    url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
    success: function(resp){
        resp = resp.replace(/ +/g, ' ');
        count = resp.split(' ').length;
        console.log(count);
        $('#count').text(JSON.stringify(count));
    }
})

