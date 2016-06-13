$( "li" ).click(function() {
  
  // var index = $( "div" ).index( this );
  var index = $(this);
  var counter = 0;
  $("li").each(function(){
  	if(($(this).prev().length) === 0){
  		counter = 0;
  	}
  	if($(this).is(index)){
  		return false;
  	} else{
  		counter++;
  	}
  })

  // var test = $(this).parent().is(index.parent());
  $("span").text("Output is " + counter);
  // $( "span" ).text( "That was div index #" + index );
});