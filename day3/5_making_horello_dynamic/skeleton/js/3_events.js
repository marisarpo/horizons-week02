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
    hitEnter(event,"#addListSave","click");
 })


  // 1c. Add list form: save button
  // This event, triggered when the "Save" button on the "Add a list..."
  // form is clicked, should 1. validate the input (i.e., make sure that
  // a value has been input for the list name), 2. update the data model
  // accordingly, and 3. cause the new list to appear on the board.

  // YOUR CODE HERE
  $('#addListSave').click(function(e){
    var listName = $('#addListText').val();
    var okay = checkInput(listName,"list name");
    
    ///console.log("fwakgfbraufliwa")
    if(okay){
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
    $('.addCard[data-id="'+$(e.target).data('id')+'"]').collapse('show');
  });

  $('.add-card').click(function(e) {
    $('.addCardText[data-id="'+$(e.target).data('id')+'"]').focus();
  })
  $('.addCardText').off();
  $('.addCardText').on('keypress', function(e){
    hitEnter(e,'.addCardSave',"click");
  })

  $('.addCardSave').click(function(e){
    var cardName = $('.addCardText[data-id="'+$(e.target).data('id')+'"]').val();
    var okay = checkInput(cardName,"card name");
    if(okay){
      board.getList($(e.target).data('id')).addCard(cardName,'');
      $('.addCardText[data-id="'+$(e.target).data('id')+'"]').val('');
      $('#expandButton'+$(e.target).data('id')).hide(); 
      horello.mount(board);
    }
  });

  $('.addCardCancel').click(function(e){
    $('.addCard[data-id="'+$(e.target).data('id')+'"]').collapse('hide');
  })

//Edit List Name

  $('.list-title').click(function(e){
    //console.log("list-title clicked")
  //   $('#'+$(e.target).data('id')+'.titleChanger').trigger("click");
  // })

  // $('.titleChanger').on('click',function(e){
    var titleSpace = $('.titleChanger[data-id="'+$(e.target).data('id')+'"]');
    titleSpace.prop('disabled',false);
    titleSpace.focus();
    //console.log("should be enabled")
    //save on click away or enter

    titleSpace.off();
    titleSpace.on('keypress', function(event){
    
    if(event.keyCode == 13){
      console.log("clicked enter");
      checkAndSaveTitle(titleSpace.val(),board.getList($(e.target).data('id')),titleSpace);
    }
    })

    $('.titleChanger[data-id="'+$(e.target).data('id')+'"]').blur(function(e){
      checkAndSaveTitle(titleSpace.val(),board.getList($(e.target).data('id')),titleSpace);  
    })

  })

  var checkAndSaveTitle = function(tempTitle,list,titleSpace){

    var okay = checkInput(tempTitle,"list title")
    if(okay){
      list.setName(tempTitle);
      $(titleSpace).prop('disabled',true);
      horello.mount(board);
    }      
  }


$('.card-body').click(function(e){console.log("clicked")})

// Phase 4(a). Edit card
  var clickedCard = null;
  $('.card-body').click(function(e){
    var temp = $('.card-body[data-id="'+$(e.target).data('id')+'"]');
    clickedCard = board.getList($(e.target).data("listId")).getCard($(e.target).data("id"));
    $('#modalText').val(clickedCard.getTitle());
    $('#modalBody').val(clickedCard.getDescription());
    $('#cardEdit').modal('show');

  })
  $('#cardEdit').off();
  $('#cardEdit').on('shown.bs.modal',function(e){
    $('#modalText').focus();
  })

  $('#modalSave').click(function(e){
    //console.log("savingggggg")
    var clickedCardName = $('#modalText').val();
    var clickedCardDesc = $('#modalBody').val();

    var okay = checkInput(clickedCardName,"card name");
    if(okay){
      clickedCard.setTitle(clickedCardName);
      clickedCard.setDescription(clickedCardDesc);
      $('#cardEdit').modal('hide');
      horello.mount(board);
    }
    
  })
  $('#modalText,#modalBody').off()
  $('#modalText,#modalBody').on('keypress', function(event){
    hitEnter(event,'#modalSave','click')
  })

  //Delete list

  $('.listClose').click(function(e){
    board.rmvList($(e.target).data('id'));
    horello.mount(board);
  })


  //Delete card
  $('.cardClose').click(function(e){
    var tempList = board.getList($(e.target).data("listId"));
    var tempCard = tempList.getCard($(e.target).data('id'));
    tempList.rmvCard(tempCard.getId());
    horello.mount(board);
  })

  //Close buttons appear on hover
  $('.list-header').off();
  $('.list-header').on("mouseenter",function(e){
    console.log("moved on"+$(e.target).data('id'))
      $('.close[data-id="'+$(e.target).data('id')+'"').show();
  })
  $('.list-header').on("mouseleave",function(e){
      console.log("moved off")
      $('.close[data-id="'+$(e.target).data('id')+'"').hide();
      console.log("x is gone")
  })

  //click on left align to expand  

  $('.card-more').click(function(e){

    var tempList = board.getList($('.card-body[data-id="'+$(e.target).data('id')+'"').data("listId"));
    var tempCard = tempList.getCard($(e.target).data('id'));
    tempCard.setShowGlyph("none");
    console.log("hidden")
    $('.desc[data-id="'+$(e.target).data('id')+'"').collapse('show');
    $('#expandButton'+$(e.target).data('id')+".hasDesc").hide();
  })
  
  $('.desc.collapse').click(function(e){
    var tempList = board.getList($('.card-body[data-id="'+$(e.target).data('id')+'"').data("listId"));
    var tempCard = tempList.getCard($(e.target).data('id'))
    
    $('.desc[data-id="'+$(e.target).data('id')+'"').collapse('hide');
    $('#expandButton'+$(e.target).data('id')).show();
    tempCard.setShowGlyph("block");
  })

  

};


function hitEnter(e, inputBox, effect) {
  
  if(e.keyCode == 13){
    
    console.log("hit enter")
      $(inputBox).trigger(effect);
    }
}

function checkInput(input,alertMessage){
  if(!input || input.length<1){
    console.log("alerting");
    alert("Invalid "+alertMessage);
    return false;
  }
  return true;
}
