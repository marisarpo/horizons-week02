

$('ul').on('click', 'li', function(){
  var num = 0;
  for (var i=0; i< $('ul li').length; i++){
    num ++;
    if ($('ul li')[i].innerHTML === $(this).text()){
      break;
    }
  }
  $('span').text('This was div index '+ num)

})
