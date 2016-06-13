$( "li" ).click(function() {
  var index = $( "li" ).index( this );
  $( "span" ).text( "That was name index #" + index );
});