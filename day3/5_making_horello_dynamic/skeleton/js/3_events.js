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
 
  // YOUR CODE HERE

    $('#addList').on('shown.bs.collapse', function(e){
    $("addListText").focus();
  });



  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  // YOUR CODE HERE
  $('#addListSave').click(function(e){
    if(!$('#addListText').val()){
      alert("need to name your list dude");
      return
    }
    board.addList($('#addListText').val());
     $('#addList').collapse('toggle');
    $('#addListText').val('');
    console.log('x') 
    horello.mount(board);
  }); 


  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  $('#addListCancel').click(function(e){
    $('#addList').collapse('hide');
  })


 // Modal: these events control the modal that appears when you click
  // on a card.

 // YOUR CODE HERE
//with card click
//to open
$('.card-body').click(function(e){
$('#cardEdit').modal('toggle');
})

//close button
$('.close').click(function(e){
$('#'+this.id).collapse('hide');
});

var listId= $('#data-list-id');
var carId = $('#data-card-id')

  $('#modalSave').click(function(e){
    if(!$('#modalText').val()){
      alert("need to name your list dude");
      return
    }
    board.addList($('#modalText').val());
     $('#'+this.id).collapse('toggle');
    $('#modalText').val(''); 
    horello.mount(board);
  }); 

}

// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  // Phase 3. Create card
////add new save class to save button (modify within part 2)
///need list id aka string (Can pull from board)

//render and rerender
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

  // Phase 4(a). Edit card

  // YOUR CODE HERE
};

