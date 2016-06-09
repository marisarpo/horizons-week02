// PART 3. Events
//
// This function is called once, when the page loads, to set up all of
// the static events, i.e., events that do not need to change as we
// change the contents of the board. For instance, the "Add list" button
// always does the same thing. The button doesn't appear or disappear
// and its behavior never changes.
horello.mountStatic = function() {

  // Phase 1. Static events

  // Add list form: these events control the "Add a list" form that
  // appears on the top-level board.

  // 1a. [EXAMPLE] Add list form: toggle collapse
  // This event, attached to the "Add a list..." button, should cause
  // its associated form to appear and disappear.
  $('.add-list').click(function(e) {
    $('#addList').collapse('toggle');
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).

  $('.add-list').click(function(e) {
    $('#addListText').focus();
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  $('#addListSave').click(function(e) {
    var listName = $('#addListText').val();
    if (listName.length < 1) {
      return;
    }
    var listId = board.addList(listName);
    $('#addList').collapse('toggle');
    $('#addListText').val("");
    $('#board').append(board.getList(listId).render());
    horello.mount(board);
  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  $('#addListCancel').click(function(e) {
    $('#addList').collapse('toggle');
  });
}

// This function is called multiple times, to configure dynamic events.
var once = false;
horello.mount = function(board) {
  // Phase 3. Create card

  // Unrender and re-render the board.
  if (!once) {
    console.log('only once!');
    $('#boardAnchor').empty();
    $('#boardAnchor').append(board.render());
    once = true;
  }

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form

  $(".add-card").each(function() {
    var id = $(this).attr('id');

    $('#collapse' + id).off();
    $('#collapse' + id).on('shown.bs.collapse', function() {
      $('#addCardTitle' + id).focus();
    });

    $('#saveCardBtn' + id).off();
    $('#saveCardBtn' + id).click(function() {
      if ($('#addCardTitle' + id).val().length < 1) {
        return;
      }

      var cardId = board.getList(id).addCard($('#addCardTitle' + id).val(), 'description');
      $('#' + id).children().eq(1).append(board.getList(id).getCard(cardId).render());
      horello.mount(board);
      $('#addCardTitle' + id).val("");
      $('#collapse' + id).collapse('toggle');
    });

    $('#addCardCancelBtn' + id).off();
    $('#addCardCancelBtn' + id).click(function() {
      $('#collapse' + id).collapse('toggle');
    });
  });

  // Phase 4(a). Edit card

  $('.card').each(function() {
    $(this).off();
    $(this).click(function(e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });

  $('#cardEdit').on('show.bs.modal', function(e) {
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

  // 1f. Modal save
  $('#modalSave').click(function(e) {
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
    horello.mount(board);
  });
};
