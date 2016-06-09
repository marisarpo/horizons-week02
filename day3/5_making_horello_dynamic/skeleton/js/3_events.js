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
  $('.add-list').click(function() {
    $('#addList').collapse('toggle');
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
 

  // $('.add-list').on('shown.bs.collapse', function(evt) {
  //   $('.form-control').focus();
  // })

  // how i did it
  //
  $('.add-list').click(function() {
    $('.form-control').focus();
  })

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.
  $('#addListSave').click(function() {
    var input = $("#addListText").val();
    if(!input) {
     alert("pls add list name");
    }

    board.addList(input);
    // $("#addListText").val('');
    // $('#addList').collapse('hide');
    horello.mount(board);
  })


  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  $('#addListCancel').click(function(){
     $('#addList').collapse('toggle');
  });
}

// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  // Phase 3. Create card

  // Unrender and re-render the board.
  $('#boardAnchor').empty();

  // this is important. you must append to the dom were you want
  // it to be in order for you to see it on the screen
  $('#boardAnchor').append(board.render());

  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form
  $('.add-card').click(function(evt) {
    // instead of evt.target you can also use $(this)
    var dd = $('#'+evt.target.nextSibling.id);
    dd.collapse('toggle');
    var listId = $(evt.target).attr('listid');
    $('#save-card'+listId).focus();


    $('#save-btn'+listId).click(function(){
      var input = $('#save-card'+listId).val();
      if (input){
        var listUsed = board.getList(listId);
        listUsed.addCard(input, null);
        horello.mount(board); // we do this because
        // we need to do this because we need to reload the
        // listeners after we rerender the page
      }
      // else {
      //   $("save-card"+listId).collapse('toggle');
      // }
    })

    $('footer'+listId + '> .well > .btn:last-child').click(function(evt) {
      dd.collapse('toggle');
    })
  });

  // Phase 4(a). Edit card
  $('.card-body').click(function(evt){
    
    $('#cardEdit').collapse('toggle');

    var listId = $(evt.target).attr('listId');
    var cardId = $(evt.target).attr('id');
    var list = board.getList(listId);
    var card = list.getCard(cardId);
    $('#modalSave').click(function(evt){
      var newTitle = $('#modalText').val();
      var newDesc = $('#modalBody').val();
      card.setTitle(newTitle);
      card.getDescription(newDesc);
      $('#cardEdit').collapse('toggle');
      horello.mount(board);
    })
     $('#modal-close1').click(function(evt){
      $('#cardEdit').collapse('toggle');
     })
     $('#modal-close2').click(function(evt) {
      $('#cardEdit').collapse('toggle');
     })
  })

  // $('.card-body').click(function(evt){
  //   $('.card-edit').collapse('toggle');
  // })
  
};

