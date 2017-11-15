//this file contains the jquery needed to set click handlers and
//the corresponding assignment of ids to each li unit which will be needed
//to display which id was clicked to the user.

//instantiate an empty array that will hold ids and corresponding names.
var ids = [];

//here we assign each li an index alongside the text of each li
$('li').each(function( index ) {
  ids.push( index + ': ' + $( this ).text());
});

//here we handle the click of each li. we grab the text of the li clicked,
// then compare it to the array of ids/names. we compare by finding the array
//element that contains the name(text) we just found, and then store the corresponding
//index for later use. we then access the span in our html file
// and set new html text that displays 'that was li index # [the index]'
$('li').click(function( e ) {
  let text = $(e.target).text();
  for (var i = 0; i < ids.length; i++) {
    if (text == ids[i].substring(3)) {
      let index = ids[i].substring(0,1);
      $('span').html('That was li index #' + index);
    }
  }


});
