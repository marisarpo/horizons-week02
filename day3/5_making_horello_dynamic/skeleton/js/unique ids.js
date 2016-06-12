// PART 3. Events
//
// This function is called once, when the page loads, to set up all of
// the static events, i.e., events that do not need to change as we
// change the contents of the board. For instance, the "Add list" button
// always does the same thing. The button doesn't appear or disappear
// and its behavior never changes.
horello.mountStatic = function(board) {

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
 $('.add-list').on('click', function() {
    $('#addListText').focus();
  })

 $('#addListText').on('keypress', function(event){
    if(event.keyCode == 13){
      $("#addListSave").trigger("click");
    }
 })


  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  // YOUR CODE HERE
  $('#addListSave').click(function(e){
    var listName = $('#addListText').val();
    if(!listName && listName.length<1){
      alert("Invalid list name");
    }
    else{
      ///console.log("fwakgfbraufliwa")
        board.addList(listName);
        $('#addListText').val('');
        horello.mount(board);
    }
  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  $('#addListCancel').click(function(e){
    $('#addList').collapse('hide');
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

  // YOUR CODE HERE

  $('.add-card').click(function(e) {
    $('#addCard-'+$(e.target).attr('id')).collapse('show');
  });

  $('.add-card').on('click', function(e) {
    $('#addCardText-'+$(e.target).attr('id')).focus();
  })

  $('.addCardText').on('keypress', function(event){
    if(event.keyCode == 13){
      $("#addCardSave-"+$(event.target).attr('id')).trigger("click");
    }
  })
  $('.addCardSave').click(function(e){
    var cardName = $('#addCardText-'+$(e.target).attr('id')).val();
    if(!cardName && cardName.length<1){
      alert("Invalid card name");
    }
    else{
      board.getList($(e.target).attr('id')).addCard(cardName,'');
      $('#addCardText-'+$(e.target).attr('id')).val('');
      
    }
    horello.mount(board);
  });
  $('.addCardCancel').click(function(e){
    $('#addCard-'+$(e.target).attr('id')).collapse('hide');
  })

//Edit List Name

$('.list-title').on("click",function(e){
  console.log("list-title clicked")
//   $('#'+$(e.target).attr('id')+'.titleChanger').trigger("click");
// })

// $('.titleChanger').on('click',function(e){
  var titleSpace = $('#titleChanger'+$(e.target).attr('id'));
  titleSpace.prop('disabled',false);
  titleSpace.focus();
  console.log("should be enabled")
  //save on click away or enter


  $('#titleChanger-'+$(e.target).attr('id')).on('keypress', function(event){
    if(event.keyCode == 13){
      console.log("clicked enter");
      checkAndSaveTitle(titleSpace.val(),board.getList($(e.target).attr('id')),titleSpace);
    }
  })

  $('#titleChanger-'+$(e.target).attr('id')).blur(function(e){
    checkAndSaveTitle(titleSpace.val(),board.getList($(e.target).attr('id')),titleSpace);  
  })

})

var checkAndSaveTitle = function(tempTitle,list,titleSpace){
  if(!tempTitle && tempTitle.length<1){
      alert("Invalid list title");
    }
    else{
      list.setName(tempTitle);
      $(titleSpace).prop('disabled',true);
      horello.mount(board);
    }
}

// Phase 4(a). Edit card
  var clickedCard = null;
  $('.card').on("click",function(e){
    clickedCard = board.getList($(e.target).data("listId")).getCard($(e.target).data("cardId"));
    $('#modalText').val(clickedCard.getTitle());
    $('#modalBody').val(clickedCard.getDescription());
    $('#cardEdit').modal('show');

  })

  $('#cardEdit').on('shown.bs.modal',function(e){
    $('#modalText').focus();
  })

  $('#modalSave').on('click',function(e){
    var clickedCardName = $('#modalText').val();
    var clickedCardDesc = $('#modalBody').val();
    if(!clickedCardName && clickedCardName.length<1){
      alert("Invalid card name");
    }
    else{
      clickedCard.setTitle(clickedCardName);
      clickedCard.setDescription(clickedCardDesc);
      $('#cardEdit').modal('hide');
      horello.mount(board);
    }
    
  })
  
  $('#modalText,#modalBody').on('keypress', function(event){
    
    if(event.keyCode == 13){
      $("#modalSave").trigger("click");
    }
  })


};

