// PART 3. Events
//
// This function is called once, when the page loads, to set up all of
// the static events, i.e., events that do not need to change as we
// change the contents of the board. For instance, the "Add list" button
// always does the same thing. The button doesn't appear or disappear
// and its behavior never changes.
horello.mountStatic = function() {
  //static because it only occurs once when the page loads

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
  //look up javascript events and it should be shown
  $('#addList').on("shown.bs.collapse", function (e){
    $("#addListText").focus();
  });

  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  //need a click action for save button, so get that id
  $("#addListSave").click(function(ev){
    //tells us what we need to do
    var listName = $("#addListText").val()
    console.log(listName);
    if (!listName){
      alert("enter a list name");
      return
    }

    //update data model accordingly
    board.addList(listName);
    console.log(board)
    $("#addListText").val("");//reset the input field to be empty.
    $('#addList').collapse('hide'); //collapse toggle also, could either do 'hide' or 'toggle'


    //make the new list appear on the board. data model was updated but board
    //was not being re-rendered.
    //append the list into the DOM, or re-render the whole board.

    horello.mount(board);

  });

  // 1d. Add list form: cancel button
  // This event, triggered when the "X" (cancel) button on the "Add a
  // list..." form is clicked, should hide the form.

  // YOUR CODE HERE
  $("#addListCancel").click(function(){
    $("#addList").collapse('hide');
  })
}



  // Unrender and re-render the board.
horello.rerender = function(board){
  $('#boardAnchor').empty();
  $('#boardAnchor').append(board.render());
}


// This function is called multiple times, to configure dynamic events.
horello.mount = function (board) {
  console.log("Mounting!");
  // Phase 3. Create card
//inspect the save button in console, and see that there is no id anymore just button type and class
//does it matter which list we're on, for the save button? yes, if we click save on list 1 then we
//need to add to save 1, same for save 2. but for first step of adding click event, it doesn't
//matter which list -- add click event to ALL save buttons. need a way to add it to all them
//(not .button because it's just button because not a class. looks for all buttons inside add card form. 
  // could do :first-child or eq(0) or whatever to get the first one)
//or just add a class to the html. make a selecter for every button. add an id or class because
//no way to grab a certain group. Go to every save button and add a new class called "save" at the end of every "class" in 
//rendering(file 2).
//selecter now grabs all save buttons. one click event now for all saved buttons


  // // Unrender and re-render the board.
  // $('#boardAnchor').empty();
  // $('#boardAnchor').append(board.render());
  horello.rerender(board); //calling what's outside of horello.mount


  $(".save").click(function(ev){
  //now have to konw which list we're on when clicking the save button because we want to add the card to the right list
  //to add the card, look at list.addCard method -- need a list object
  //figure out which list object corresponds with the card you're goign to add
  //go to addCard in file 1. Would have to ask the board to get a list by ID -- board.getList -- takes a list id, which
  //is a string. Stick list ID into every list container? Just stick it on button itself.
  //moved this to below the above two lines because that clears the board, which we don't want, removing it from the DOM...

  //for every save button, attach an id to the save button -- id of list. added get list id to render file (2). Now a 
  //new data element will appear.
  //can do everything else we need to do now.

  //.attr: $(".save").attr("type") --> will return it's type, or if you did class it would return it's class, etc.
  //gets whatever attribute you want
  //so can get the attribute of the value of the id
    var listId = $(this).attr("data-list-id");
    //almost equivalent to line below -- want the one save button slected, not all of them
    //$(".save").attr("data-list-id")
    var list = board.getList(listId);
    //pass in the text value of the card. inspect the card in the console and see what's there, attach an id so you can easily find it
    //(into file two) -- added that next to the title
    //make sure it actually contains something -- if not, then display alert, just as before
    if (!$("#list_name_" + listId).val()) {
      alert("enter card title");
      return;
    }
    var nameOfCard = $("#list_name_" + listId).val()
    
    list.addCard(nameOfCard);
    horello.mount(board); //this looks like a recursive call but it's not because you're not clicking save. recursion keeps calling
    //until it reaches the base case. there is no base case here. it's clicking save. otherwise it'd be an infinite loop because
    //there is no base case.  so it's just calling horello.rerender() when reaching that last line.
    //if you called just rerender, all our event listeners would go away
  });


  // 2a. Add card forms
  // Write selectors to add the following functionality to each "Add a
  // card..." button and form:
  // - Clicking the button reveals the form
  // - When the form is revealed, the title field is focused
  // - Clicking Save validates the input and creates the new card
  // - Clicking Cancel collapses the form

  // YOUR CODE HERE

//When the form is revealed, the title field is focused
$('.add-card').each(function (idx) {
  $(this).off();

  var id= $(this).attr("href");

  $(this).click(function (event) {
    $('#addCard_'+id).collapse('toggle');
  });

  $('#addCard_'+id).off();

  $("#addCard_"+id).on("shown.bs.collapse", function(event){
    $("#list_name_" + this.getId()).focus();
  });

  var addCardBtn = $(this).attr("data-list-id")

  $(addCardBtn+id).off();
  $(addCardBtn+id).click(function (event) {
    if (!$("#list_name_" + id).val()) {
      alert("enter card title");
      return;
    }

    var list = board.getList(id);
    list.addCard($("#list_name_" + id).val());
    horello.mount(board);
  });

  $("#addCardCancelBtn"+id).off();
  $("#addCardCancelBtn"+id).click(function (event) {
    $("#addCard_"+id).collapse('hide')
  });

});
  // $(".add-card").on("shown.bs.collapse", function (evt){
  //   var id = $(evt.target).attr('href');
  //   $("#list_name_" + id).focus();
  // });


  // $(".add-card").on("shown.bs.collapse", function(evt){
  //   $("#list_name_" + this.getId()).focus();
  // })

  // Phase 4(a). Edit card

  // YOUR CODE HERE
  $('.card').each(function (idx) {
    $(this).off();
    $(this).click(function (e) {
      $('#cardEdit').modal('toggle', $(this));
    });
  });
};

