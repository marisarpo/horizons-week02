"use strict";

var cardBeingEdited = null; //card the user clicked on


$('.add-list').on('click', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function(){
    var $this = $(this);
    var parentName = $this.closest('.add-card-form');
    var input = parentName.children('.form-control').val();
    var newList = `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${input}</span>
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
</div>`
  $('.add-list-form-wrapper').before(newList);

})

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');

})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');

})

$('.board').on('click', '.add-card-save', function(){
  var $this = $(this);
  var input = $this.siblings('.form-control').val();
  var newCard = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${input}</div>
</div>`
var cardList = $(this).closest('.list-footer').siblings('.list-cards');
$(cardList).append(newCard);
$(this).closest('.add-card-form-wrapper').addClass('collapse');

})

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var cardContent = cardBeingEdited.children('.card-body').text();
  $('#card-edit-body').val(cardContent);
})

$('.modal-footer').on('click', '.card-edit-save', function(){
  var modalDiv = $(this).closest('.modal-content');
  console.log(modalDiv);
  var content = modalDiv.find("#card-edit-body").val();
  console.log(content);
  cardBeingEdited.children('.card-body').text(content);
})

$('.list-cards').sortable({
  connectWith:".list-cards"
  });

$(document).keydown(function(event){
  if (event.keyCode=== 67){
  $('.card:hover').remove();
}
})

$('.header-logo-default').on('click', function(){
    $('header').css("background-color", "red");
    $('body').css("background-image", "url(https://s-media-cache-ak0.pinimg.com/736x/1f/12/74/1f1274516b0db245deb83f8959a4fd8c.jpg)");
    $('.list').css("background-color", "pink");
    $('.card').css("background-color", "rgb(33, 110, 120)");
})
