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
  $('#addListButton').click(function(e) {
    $('#addList').collapse('toggle');
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
  $('#addList').on('shown.bs.collapse', function() {
    $("#addListText").focus();
  });
  // YOUR CODE HERE

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  $('#addListSave').on('click', function(e) {
    if (!($('#addListText').val())) {
      alert("You need to enter a name.");
      return;
    }
    board.addList($('#addListText').val());
    $('#addListText').val("");
    $('#addList').collapse('hide');
    horello.mount(board);
  })
  // YOUR CODE HERE

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });

  // YOUR CODE HERE
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

  // YOUR CODE HERE
  // $(".add-card").on("click", function(e) {
  // })
  $("#addCard").on("click", function(e) {
    $('#').collapse('toggle')
  })

  $(".save").on("click", function(e) {
    var btn = $(this);
    var listId = btn.data("list-id");
    var found = board.getList(listId);

    if(!($('#addCardInput_'+found.id).val())){
      alert("you need a title!")
      return;
    }
        // get correct list name from element with id=addCard_{istId}
    found.addCard($('#addCardInput_'+found.id).val());
    horello.mount(board);
  })
  // Phase 4(a). Edit card

  $('.card').on("click", function(e) {

      var cardId = $(this).attr('cardid');
      console.log(cardId);
      var listId = $(this).attr('listId');
      console.log(listId);
      var list = board.getList(listId);
      console.log(list);
      var found = list.getCard(cardId);
      console.log(found);

    $('#cardEdit').modal('toggle');
    $('#modalSave').off("click");
    $('#modalSave').on("click", function(e) {
      // get list you're in

      // get card you're editing

      // modify card
      // rerender
      found.title = ($('#modalText').val());
      $('#modalText').val("");
      $('#cardEdit').modal('hide');
      horello.mount(board);
    });
  })
  // YOUR CODE HERE
};

