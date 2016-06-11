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
 
  $('#addList').on('shown.bs.collapse', function (e) {
    $("#addListText").focus();
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  $("#addListSave").click(function(ev){
    console.log("clicked");
    if(!$("#addListText").val()){
      alert("please enter a list name");
      return;
    } 

    // debugger;
    board.addList($("#addListText").val());
    $("#addListText").val(""); // reset the input field to be empty. 
    $('#addList').collapse('hide');

    horello.mount(board);

  })

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  $("#addListCancel").click(function(){
      $('#addList').collapse('hide');
  })

  // YOUR CODE HERE
}


horello.rerender = function(board){
    $('#boardAnchor').empty();
    $('#boardAnchor').append(board.render());
}
// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  // Phase 3. Create card

  // Unrender and re-render the board.
  horello.rerender(board);

  $('.add-card').click(function(evt) {
    console.log(evt);

  var listId = $(this).data('list-id');

    $("#add-card_" + listId).collapse('toggle');
  })
  
  // $("#addCardCancelBtn" + listId).click(function(evt) {
  //   console.log(evt);

  // var listId = $(this).data('list-id');

  //   $("#addCardCancelBtn" + listId).collapse('toggle');
  // })

  // $('.save').click(function(ev) {
  //   // debugger;
  //   var listId = $(this).attr("data-list-id"); // could also use ev.target instead of this here
  //   var list = board.getList(listId);
  //   if(!$("#list_name_" + listId).val()){
  //     alert("Enter a card name");
  //     return;
  //   }

  //   var nameOfCard = $("#list_name_" + listId).val()
    
  //   list.addCard(nameOfCard);
  //   horello.mount(board);
  // });

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form

  // YOUR CODE HERE

  // Phase 4(a). Edit card

  // YOUR CODE HERE

  $('.save').click(function(e) {

    // get listId from thing clicked
    var listId2= $(this).attr("data-data-data-list-id");

    // get list from the board
    var list = board.getList(listId2);
    // update the list with the card

    if(!($("#add-card-text-"+list.getId()).val()))
    {
      alert("Enter a valid title");
    }
    var text = $("#add-card-text-"+list.getId()).val();
    list.addCard(text);

    // re-render
    horello.mount(board);
  });

// $('#addCardCancelBtn'+id).off();
// $('#addCardCancelBtn'+id).click(function (e) {
// $('#addCardForm'+id).collapse('hide');
//     });


    $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
      });
    });
    var card = $(this);
    console.log(this);
      $('#modalSave').off();
      $('#modalSave').click(function (e) {
        console.log(card);
        card.setTitle($('#modalText').val());
        card.setDescription($('#modalBody').val());
      });
};