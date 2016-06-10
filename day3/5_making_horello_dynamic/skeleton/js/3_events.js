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
  $('#addList').on('shown.bs.collapse', function(e) {
    $("#addListText").focus();
  })

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

$("#addListSave").click(function(e) {
  var listName = $('#addListText').val();

  if(!$("#addListText").val()) {
    alert("Por favor anota un nombre para la lista");
    return;
  }

  board.addList(listName);
  $("#addListText").val("");
  $('#addList').collapse('hide');
  horello.mount(board);
})




  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

$("#addListCancel").click(function() {
  $('#addList').collapse('hide');
})

  // Modal: these events control the modal that appears when you click
  // on a card.

  // 1b. This event, triggered when the user clicks on a card, should
  // reveal the "Edit card" modal, populated with that card's data. It
  // should store the necessary 


}

// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  // Phase 3. Create card

  // Unrender and re-render the board.
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form
  $('.add-card').each(function(index) {
    $(this).off();

    var id = $(this).attr("addCardId");

    $(this).click(function (e) {
      $('#addCardForm' + id).collapse('toggle');
    });

    //focus
    $('#addCardForm' + id).off();
    $('#addCardForm' + id).on('shown.bs.collapse', function(e) {
      $('#addCardTitle'  + id).focus();
    })

    //save and add title
    $('#addCardBtn' + id).click(function(e) {
      var title = $('#addCardTitle' + id).val();

      if(!title) {
        alert("Por favor anota un nombre para el titulo de la carta");
        return;
      }

      var list = board.getList(id);
      list.addCard(title);
      horello.mount(board);
    });

    $('#addCardCancelBtn' + id).click(function(e) {
      $('#addCardForm' + id).collapse('hide');
    });


  });

  
  $('.card').click(function(e) {
    $('#modalSave').off();


    $('#cardEdit').modal('show');

      var cardID = $(e.currentTarget).data('card-id');
      var listID = $(e.currentTarget).data('list-id'); 
      var List = board.getList(listID);
      var Card = List.getCard(cardID);
      var desc = Card.desc;
      var title = Card.title;

      $('#modalText').val(title);
      $('#modalBody').val(desc);

      $('#modalSave').click(function(e) {
        Card.desc = $('#modalBody').val();
        Card.title = $('#modalText').val();
        $('#cardEdit').modal('hide');


        // $('#boardAnchor').empty();
        // $('#boardAnchor').append(board.render());
        horello.mount(board);

      })

      $('#modalClose').click(function(e) {
        $('#cardEdit').modal('hide');
      })
  })  
};

