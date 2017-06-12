$(document).ready(function() {

  $('div').on('click',function(event){
    var index = -1;

    var siblings = event.target.parentNode.children;


    for(var i = 0; i < siblings.length; i++){
      if(siblings[i].localName === "div"){
        index += 1;
        if(siblings[i].innerText === event.target.innerText){
          $('span').text(`you clicked div of index ${index}`);
        }
      }
    }

  })


})
