"use strict";

// Pre-populate the board with some data. Note that tests depend upon
// this data as-is.

// jQuery document ready shorthand.
$(function () {
  var board = new horello.Board();
  board.addList("Awesomeness");
  board.lists[0].addCard("Hello", "Hello, world");
  horello.render(board);

  // Used for tests
  window.board = board;


  $('.add-list').click(function(e) { $('#addList').collapse('toggle') });
  $('#addListSave').click(function(e) {
    var listName = $('#addListText').val();
    // validate input
    if (!listName) {
      alert("Please enter a list name");
      return;
    }
    board.addList(listName);
    $('#addListText').val('');
    $('#addList').collapse('toggle');
    horello.render(board);
  });
  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  })
  
});
