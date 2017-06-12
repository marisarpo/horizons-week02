var score = 1;

$(document).ready(function() {

//FIRST LOAD
  $('#score').text(`${score} POINTS`);
  recursiveAJAX(0);

//SCROLL TO BOTTOM
  $(window).scroll(function () {
    if ($(window.top).height() + $(window).scrollTop() === $(document).height()) {

      $('#started').show();
      recursiveAJAX(0);

    }
  });

});


//LOAD UP
function recursiveAJAX(index){
  $.ajax(`https://randomuser.me/api/`, {
    dataType: 'json',
    success: function(data) {
      //console.log(data.results[0].name.first);
      if(index === 50){
        $('#started').text('finished');
        setTimeout(function(){
          $('#started').hide()
          $('#started').text('started');
        }, 2000);
        return;
      }

      $('#container').append(`<div class = "person col-xs-offset-1 col-xs-10">${data.results[0].name.first}</div>`)
      $('#score').text(`${score} POINTS`)

      score++, index++;
      recursiveAJAX(index);
    },
    error: function(err){
      console.log(err);
    }
  })

}
