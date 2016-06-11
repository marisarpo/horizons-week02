
// on clicking, you should print out the index on to the page
  

  var arr = $('.names');

  $('.names').click(function(evt){
    var name = evt.target.innerHTML;
    for (var i = 0; i<arr.length; i++) {
      if (arr[i].innerHTML === name) {
        document.getElementById('txt-insert').innerHTML = '<div>This div index is:'+i+'</div';
      }
    }
  });
