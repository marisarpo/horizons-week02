$(document).ready(function() {
  var collapsed = true;

  //expand the make tweet footer when you go to input stuff
  $('#make-tweet').on('click',function(){
    $('#make-post-footer').removeClass('collapse');
    collapsed = false;
  })

  // //collapse the tweet footer if you click anywhere else again
  // $('body').on('click',function(){
  //   if(!collapsed){
  //     $('#make-post-footer').addClass('collapse');
  //     collapsed = true;
  //   }
  // })


})
