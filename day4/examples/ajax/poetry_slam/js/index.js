// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt

$(document).ready(function(){
  // call ajax to retrieve the page content
  $.ajax({
    url: 'http://horizons-json-cors.s3-website-us-east-1.amazonaws.com/data.json',
    success: function(resp){
      var text = resp;
      var arr = text.split(/\W/);
      console.log(arr);
      var arrWords = _.filter(arr, function(x){ if(x.match(/\w/)){return true;} return false; });
      var num = arrWords.length;
      $('#count').text(num);
    }
  });

});
