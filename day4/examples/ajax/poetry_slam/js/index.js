// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    var resp2 = resp.split(" ");
    var resp3 = resp2.length;
    //console.log(resp3);
    $('body').append($('<pre>').text(resp));
    $('#count').text(resp3);
  }
})


//calculate the number of words the poem contains, and add that number to the element where id="count".
// 1) turn all words into an array of string of words
// 2) calculate number of substrings within the array
// 3) add to span id = "count"
