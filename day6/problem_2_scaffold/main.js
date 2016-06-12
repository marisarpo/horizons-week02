$('#input-collapse').click(function(e) {
   $('#input-collapse').collapse("toggle");
   var newTweet = prompt("What is your new tweet?");
   $('#input-collapse').text(newTweet);
})