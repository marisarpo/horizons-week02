// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$.ajax({
         url:"http://horizons-json-cors.s3.amazonaws.com/poem.txt",
         success: function(content) {
           var count = content.length;
           $("#count").append($('<pre>')).text(count);
         }
        })
