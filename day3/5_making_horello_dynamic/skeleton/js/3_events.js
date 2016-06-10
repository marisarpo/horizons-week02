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
 
$('#addList').on('shown.bs.collapse',function(e){ //bootstrap sends an event everytime one of its collapse its fired/opened
  $("#addListText").focus();
});

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

$('#addListSave').click(function(ev){
  if(!$("#addListText").val()){
    alert("Please enter a list name!");
  }
  else{
  board.addList($("#addListText").val());
  $("#addListText").val(""); //reset the input field to be empty.
  $('#addList').collapse('toggle'); //appear, disappear for things (collapse methods)
  horello.mount(board);
  }
})

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

$('#addListCancel').click(function(ev){
  $('#addList').collapse('toggle');
})
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

  $('.add-card').click(function(ev){
    console.log(this);
    $('#addCardForm' + this.getAttribute('addcardid')).collapse('toggle');
    $('#addCardTitle' + this.getAttribute('addcardid')).focus();
  });

    $('.save').click(function(ev){
      console.log(this);
      var saver = this.getAttribute('id').split('addCardBtn');
      if(!$('#addCardTitle' + saver[1]).val()){
        alert("Please enter a card title!");
      }
      else{
        // data-list-id
        var listId = saver[1];       
        // var listId = ($(".save").parents(".list")[0]).getAttribute("data-list-id");
        var list = board.getList(listId);

        list.addCard($("#addCardTitle" + saver[1]).val());
        $("#addCardTitle" + saver[1]).val(""); //reset the input field to be empty.
        $('#addCardForm').collapse('toggle'); //appear, disappear for things (collapse methods)
        horello.mount(board);
            }
    })

    $('#addListCancel').click(function(ev){
    $('#addList').collapse('toggle');
    })

      $('.cancel').click(function(e) {
      $('#addCardForm' + this.getAttribute('addcardid')).collapse('toggle');
  })
  // Phase 4(a). Edit card

  // YOUR CODE HERE
};

