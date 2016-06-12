$('.names').click(function(e) {
   // var newText = "You are clicking on index 0";
   $('#index').text("The index of this is now...");
   for (var i = 0; i < $('names').length; i++)
	console.log($('.names').find('#id' + i));
  });
