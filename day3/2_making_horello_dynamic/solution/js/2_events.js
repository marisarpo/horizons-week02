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

  // Bind the static events. (add card form added dynamically inside render)

  // Add list form
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
  });

  // Modal
  $('#cardEdit').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var cardId = button.data('card-id');
    var listId = button.data('list-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    $('#modalText').val(card.getTitle());
    $('#modalBody').val(card.getDescription());
    $('#modalSave').data('list-id', listId);
    $('#modalSave').data('card-id', cardId);
  });
  $('#modalSave').click(function (e) {
    var title = $('#modalText').val();
    var desc = $('#modalBody').val();
    if (!title) {
      alert('Please enter a title');
      return;
    }

    var listId = $(e.currentTarget).data('list-id');
    var cardId = $(e.currentTarget).data('card-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    card.setTitle(title);
    card.setDescription(desc);
    $('#cardEdit').modal('hide');
    horello.render(board);
  });

});
