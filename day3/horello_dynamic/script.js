"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var htmlListStr;
var htmlCardStr;
var cardBeingEdited = null;

// .add-list clicked handler
$('.add-list').on('click', function(){
  expandAddList();
});

// .add-list-cancel handler
$('.add-list-cancel').on('click', function(){
  colapseAddList();
});

// Handle adding the new list!
$('.add-list-save').on('click', function(){
  var saveName = $('.add-list-form-wrapper').find('.form-control').val();
  htmlListStr = makeListHTMLStr(saveName);
  $(this).closest('.list-container').before(htmlListStr);
  colapseAddList();
});

// .add-card expand handler
$('.board').on('click', '.add-card', function(){
  $(this).siblings().removeClass('collapse');
})

// .add-card-cancel handler
$('.board').on('click', '.add-card-cancel', function(){
  $(this).parent().parent().addClass('collapse');

})


$('.board').on('click', '.add-card-save', function(){
  var saveTitle = $(this).siblings('.form-control').val();
  htmlCardStr = makeCardHTMLStr(saveTitle);
  $(this).parent().parent().parent().siblings('.list-cards').append(htmlCardStr);
  colapseAddCard();
});

$('.board').on('click', '.card', function(){
  // Save the clicked card
  cardBeingEdited = $(this);

  // Get the card Text
  var cardTxt = cardBeingEdited.children().siblings('.card-body').text();

  // Set the text of the model body
  $('#card-edit-body').val(cardTxt);
  $('#card-edit').modal();

  
})





function colapseAddCard(){
  $('.add-card-form-wrapper').addClass('collapse');
}

function colapseAddList(){
  $('.add-list-form-wrapper').addClass('collapse');
}

function expandAddList(){
  $('.add-list-form-wrapper').removeClass('collapse');
}

function makeListHTMLStr(listTitle){
return  `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title"> `
      + listTitle +
      `</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card">Add a card...</button>
      <div class="collapse add-card-form-wrapper">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title">
          <button type="button" class="btn btn-default add-card-save">
            Save
          </button>
          <button type="button" class="btn btn-default add-card-cancel">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function makeCardHTMLStr(cardTitle){
  return ` <div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">` + cardTitle + `</div>
</div>`;

}
