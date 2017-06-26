"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

//add list
$('.board').on('click', '.add-list', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});

//cancel add list
$('.board').on('click', '.add-list-cancel', function(){
  $('.add-list-form-wrapper').addClass('collapse');
});

//save add list
$('.board').on('click', '.add-list-save', function(){
  var title = $('.add-list-form-wrapper').children().children('input').val();
  var listElement = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${title}</span>
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
</div>`);
  $('.add-list-form-wrapper').before(listElement);
})

//add Card
$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

//remove Card
$('.board').on('click', '.add-card-cancel', function(){
  $(this).parents().parents('.add-card-form-wrapper').addClass('collapse');
});

//save card
$('.board').on('click', '.add-card-save', function(){
  var addListFromWrapperDiv = $(this).parents().parents();
  var title = addListFromWrapperDiv.children().children('input').val();
  var cardElement = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`);
  var listCardsDiv = addListFromWrapperDiv.parents().siblings('list-cards');
  listCardsDiv.append(cardElement);
  //addListFromWrapperDiv.addClass('collapse');
});
