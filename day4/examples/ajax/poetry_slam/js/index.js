// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt




$.ajax({
  url: "https://horizons-json-cors.s3.amazonaws.com/poem.txt",
  success: function(resp) {
    var txt = JSON.parse(JSON.stringify(resp));
    var splitText = txt.split(' ');
    console.log('splittxt', splitText);
    var arr = [];
    for (var i=0; i<splitText.length; i++) {
      if (splitText[i] !== '...' || splitText[i] !== '-' || splitText[i] !== '""' || splitText[i] !==  '↵') {
        arr.push(splitText[i]);
      }
    }
    console.log('arr', arr);
    var answer = arr.length;
    console.log('answer', answer);
    $('#count').text(answer);
  }
})
