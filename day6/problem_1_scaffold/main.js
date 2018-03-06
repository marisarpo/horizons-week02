"use strict";

// $('body').append('<ul>');
// for( var i =0; i<10; i++){
//   var name = null;
//   do{
//     name = prompt('Name a friend');
//   }while(!name && ! name.trim());
//   $('body').append('<li>'+name+'</li>');
// }
// $('body').append('<ul>');
$('li').on('click', function() {
  $('span').text('That was li index #'+$(this).prevAll().length);
})
