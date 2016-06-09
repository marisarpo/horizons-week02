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
  $(".add-list").click(function(e) {
    $(".form-control").focus()
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  // YOUR CODE HERE
  $("#addListSave").click(function(e) {
    var textInput = $('#addListText').val();
    if (textInput.length === 0) {
      alert("no text");
      return;
    }
    board.addList($("#addListText").val());
    horello.mount(board);
  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  // YOUR CODE HERE
  $("#addListCancel").click(function(e){
    $("#addList").collapse('toggle');
  });
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
  

  // YOUR CODE HERE
  // - Clicking the button reveals the form
  $('.add-card').click(function(e) {
    
    var listID = "#" + $(e.target).attr('id');
    
    $(listID).siblings().collapse('toggle');
  });
  // // - When the form is revealed, the title field is focused
  $(".add-card").click(function(e) {
    var listID = "#" + $(e.target).attr('id');
    $(listID).parent().find(".form-control").focus();
  });

  // // - Clicking Save validates the input and creates the new card
  $(".addCardSave").click(function(e) {

   
   
   var listID = $(e.target).parent().parent().attr('id');
  
     var cardText = $("#addCardText_" + listID).val();
    
     if (cardText.length === 0) {
       alert("no text");
       return;
     }
     var listOne = board.getList(listID);
    
    
     listOne.addCard(cardText, "");

    horello.mount(board);
  });

  // // - Clicking Cancel collapses the form
  $(".addCardCancel").click(function(e){

    var listID = $(e.target).parent().parent().attr('id');
    var list = board.getList(listID);

     $("#addCard_" + listID).siblings().collapse('toggle');
     horello.mount(board);

  });

  // Phase 4(a). Edit card

  // YOUR CODE HERE

  $('.card').click(function(e) {

    
    
    var cardID = $(e.target).parent().attr('id');
    
    var listID = $(e.currentTarget).parent().parent().attr('id');
    var list = board.getList(listID);

    var card = list.getCard(cardID);
    var title = card.getTitle();
    var desc = card.getDescription();
    

    $("#cardEdit").collapse('toggle');
    $(".modal-header > .form-control").val(title);
    $(".modal-body > .form-control").val(desc);

    $(".modal-footer > .btn-primary").click(function(el) {
       title = $(".modal-header > .form-control").val();
       
        desc = $(".modal-body > .form-control").val();
        card.setTitle(title);
        card.setDescription(desc);
        $("#cardEdit").collapse('toggle');
        horello.mount(board);

    })

     $(".modal-footer > .btn-default").click(function(el) {
      $("#cardEdit").collapse('toggle');
    })
  })
};

