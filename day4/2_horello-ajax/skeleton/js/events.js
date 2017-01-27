"use strict";

// CAUTION: You probably don't need to make changes here for this project!

window.horello = window.horello || {};

horello.refreshStatic = function() {

  $('.add-list').click(function(e) {
    $('#addList').collapse('toggle');
  });

  $('#addList').on('shown.bs.collapse', function (e) {
    $('#addListText').focus();
  });

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
    horello.refresh(board);
  });

  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });

  $('#cardEdit').on('show.bs.modal', function (e) {
    console.log("BAMS")
    var button = $(e.relatedTarget);
    var cardId = button.data('card-id');
    var listId = button.data('list-id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    $('#modalText').val(card.title);
    $('#modalBody').val(card.description);
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
    card.updateCardTitle(title);
    card.setDescription(desc);
    $('#cardEdit').modal('hide');
    horello.refresh(board);
  });
};

// This function is called multiple times, to configure dynamic events.
horello.refresh = function (board) {
  /*
    Note: we are NOT unbinding event listeners from elements that are
    going away. It looks like this isn't necessary with jquery per
    http://stackoverflow.com/questions/10957709/do-i-need-to-unbind-jquery-event-before-remove-element.
    However, we do remove listeners on elements that stick around so
    that we don't duplicate listeners (not 100% sure whether this is
    necessary but let's do it to be safe).
   */

  // Unrender and re-render the board.
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());

  $('.add-card').each(function (idx) {
    $(this).off();

    var id = $(this).attr('addCardId');

    // Open add card form
    $(this).click(function (e) {
      $('#addCardForm'+id).collapse('toggle');
    });

    $('#addCardForm'+id).off();
    $('#addCardForm'+id).on('shown.bs.collapse', function(e) {
      $('#addCardTitle'+id).focus();
    });

    // Save new card
    $('#addCardBtn'+id).off();
    $('#addCardBtn'+id).click(function (e) {
      var val = $('#addCardTitle'+id).val();
      if (!val) {
        alert('Please enter a card title');
        return;
      }

      // Get the list object
      var list = board.getList(id);
      list.addCard(val);
      horello.refresh(board);
    });

    // Cancel
    $('#addCardCancelBtn'+id).off();
    $('#addCardCancelBtn'+id).click(function (e) {
      $('#addCardForm'+id).collapse('hide');
    });
  });

  $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });
};
