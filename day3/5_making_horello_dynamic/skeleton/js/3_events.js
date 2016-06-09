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

  // 1a. [EXAMPLE] Add list form: toggle collapses 
  // This event, attached to the "Add a list..." button, should cause
  // its associated form to appear and disappear.

                                              // if you try to focus something before appending -> it might not be able to focus
                                              // we don't want to trigger on the click event we want to trigger when it appears

  $('.add-list').click(function(e) {    //once add list class is clicked it will collapse into the toggle
    $('#addList').collapse('toggle');   //# calls id
  });

  // 1b. Add list form: focus the title text input
  // This event, triggered whenever the "Add a list..." form appears,
  // should focus on its text input (so the user can start typing
  // immediately, without having to click again to select the text input
  // field).
 
  // $('#mModal').on ('shown.bs.collase', function(e){     //shown.bs.collase -> bs collapse right after event is sent -> set new events 
  //   $("#addListText").focus();    //id so it is just quotation marks and #
  // })

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  //we need a click action for the save button
  $("#addListSave").click(function(ev){ //ev is not nessesary but it is good just to have it
    if (!$('#addListText').val()){
      alert("please enter a list name");
      return
    }


    board.addList($("#addListText").val());
    $("#addListText".val("")); //reset the input field to be empty
      $('#addList').collase('hide'); //don't use toggle bc it hides and shows automatically
  
  })

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

$("#addListCancel").click(function(){
  $('#addList').collapse('hide');
})

// This function is called multiple times, to configure dynamic events.

horell.rerender = function(){
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());
}

horello.mount = function (board) {
  // Phase 3. Create card


//attach event to all the save buttons
//  add one click event to all the save buttons
// $(".add-card-form button") //takes all ad buttons in the add card form 

i
  //dynamic events -> rerendering the entire board
  //click add a card -> add card -> rerender the list it is in 

  // Unrender and re-render the board.
  
  $('.save').click(function(ev){//add .save to the render output of list
    var listId = this.attr('data-list-id'); //could also use ev.target instead of 'this'
    var list = board.getList(listId);
    // list.addCard($("#list_name_" + listId).val());;
    if(!$('#list_name_' + listId).val()){
      alert ('Enter a card name');
      return
    }
    list.addCard($('#list_name_'+listId).val());    //refers to the value inside the text edit area
    horello.mount();
  });                                                 //not recursson?

      // bottom is the same s
        //var nameofCard = $("#list_name_" + listId).val()
        list.addCard(nameOfCards)
        horello.mount(board);
      };
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

