"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

$(window).on('keydown',function(event){
  var x= String.fromCharCode(event.which)
  if(x==='C'){
    $('.card:hover').remove();
  }
})

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $("#card-edit").modal()
  var cardVal = cardBeingEdited.find('.card-body').text()
  $("#card-edit-body").val(cardVal)
})

$('.card-edit-save').on('click', function() {
  var text = $("#card-edit-body").val();
  cardBeingEdited.find('.card-body').text(function() {
    return (text)
  })
 })

$('.list-cards').sortable({
  reverse: false,
  items: '.card',
  connectWith: ".list-cards"
});




$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper input').val();
  var listAdd = (`<div class="list-container">
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
$('.add-list-form-wrapper').closest('.list-container').before(listAdd)
$('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  var $this = $(this);
  var addcardDiv = $this.siblings('.add-card-form-wrapper')
  addcardDiv.removeClass('collapse');
})

$('.board').on('click','.add-card-cancel', function() {
  var $this = $(this);
  var addcardDiv = $this.closest('.add-card-form-wrapper')
  addcardDiv.addClass('collapse');
})

$('.board').on('click','.add-card-save', function() {
  var $this = $(this);
  var title = $this.siblings('input').val()
  var cardAdd = (`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${title}</div>
</div>`);
var listCards = $this.closest('.list-footer').siblings('.list-cards');
listCards.append(cardAdd)

})
