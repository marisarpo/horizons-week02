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
    $(".form-control").focus();
  });
  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
 
  // YOUR CODE HERE
  // $('#addlist').on('shown.bs.collapse', function(e){
  //   $(".form-control").focus();
  // });
  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.
  // YOUR CODE HERE
  $('#addListSave').click(function(e) {
    if (!$('#addListText').val()) {
      alert("name list");
    }
    board.addList($('#addListText').val());
     $('#addList').collapse('toggle');
     $('#addListText').val("");
     horello.mount(board);
  })
       
  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.
  // YOUR CODE HERE
  $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });
  // Modal: these events control the modal that appears when you click
 // on a card.

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
  $(".add-card").click(function(e){
    console.log(e.target)
    $("#addCardForm"+this.getAttribute("addcardid")).collapse('toggle')
    $(".form-control").focus();
  })


  // - Clicking Save validates the input and creates the new card
  $(".save-btn").click(function(e){ // use e.target or this to get the save button
    console.log(e.target)
    var z=this.id
    z=z.split("addCardBtn")
    console.log(z)
    if(!$("#addCardTitle"+z[1]).val()){
      alert('need list title');
      return;
    }
  var y = board.getList(z[1])
  // //  console.log(y)
    y.addCard($("#addCardTitle"+z[1]).val(),[])
    horello.mount(board)
  })

  // - Clicking Cancel collapses the form

  $('.close-btn').click(function(e){
  //debugger;
   var z=$(this).children('span').attr('id')
   z=z.split("addCardCancelBtn")
    console.log(z[1])
    //z=z.split("addCardTitle")
    //console.log(z[1])
    $("#addCardForm"+z[1]).collapse('toggle')
  });
  // YOUR CODE HERE
  // Phase 4(a). Edit card
  // YOUR CODE HERE

  $(".card").on("click", function(e){
   $("#cardEdit").modal('show');
   var button = $(e.currentTarget);
  // debugger;


  console.log(e);
  var cardId = button.data('card-id');
  console.log(cardId);
  var listId = button.data('list-id');
  console.log(listId);
  var list = board.getList(listId);
  console.log(list);
  var card = list.getCard(cardId);
  $('#modalText').val(card.getTitle());
    console.log(card.getTitle());
  });
 // $("#cardEdit").on('shown.bs.modal', function (evt) {
  
 // });
  $('#modalSave').click(function(e) {
    if (!$('#modalText').val()) {
      alert("You need to name your stupid freaking list!");
      return;
    }
     $('#cardEdit').modal('hide');
     horello.mount(board);
  })
 $('.close').click(function(e) {
    $('#cardEdit').collapse('hide');
  });
 $('#addListCancel').click(function(e) {
    $('#addList').collapse('hide');
  });
};
