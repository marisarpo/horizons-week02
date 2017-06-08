// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt
$.ajax({
    url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp){
<<<<<<< Updated upstream
    $('#count').text(JSON.stringify(resp).split(" ").length;
    console.log(count));
    }
})
=======
    $('#count').text(resp.split(" ").length);
    }
})


//alternative but the poem is already a tring
// $.ajax({
//     url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
//   success: function(resp){
//     $('#count').text(JSON.stringify(resp).split(" ").length);
//     }
// })
>>>>>>> Stashed changes
