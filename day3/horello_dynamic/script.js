"use strict";

var cardBeingEdited = null;

$('.add-list').on('click', function(){


  $('.add-list-form-wrapper').removeClass('collapse')

});

$('.add-list-cancel').on('click', function(){


  $('.add-list-form-wrapper').addClass('collapse')

})


$('.add-list-save').on('click', function(){

var title = $('.add-list-form-wrapper .form-control').val()

var newList = `<div class="list-container">
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
</div>`
var mother = $(this).closest('.list-container')
mother.before(newList)


})


$('.board').on('click','.add-card',function(){

var mother = $(this).siblings('.add-card-form-wrapper');
mother.removeClass('collapse')



})
$('.board').on('click','.add-card-cancel',function(){

var mother = $(this).closest('.add-card-form-wrapper');
mother.addClass('collapse')



})

$('.board').on('click', '.add-card-save', function(){

var mother = $(this).siblings('.form-control').val()

var newItem = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${mother}</div>
</div>`

var parent = $(this).closest('.list-footer');
var position = parent.siblings('.list-cards');
position.append(newItem);
$('.list-cards').sortable(
  {
    connectWith: ".list-cards"
  }
)
$('.add-card-form-wrapper').addClass('collapse')

})

$('.board').on('click', '.card', function(){

cardBeingEdited = $(this);
var oldText = cardBeingEdited.find('.card-body').text();
$('#card-edit-body').val(oldText)
$('#card-edit').modal()

})

$('.card-edit-save').on('click', function(){

  var newText = $('#card-edit-body').val();
  cardBeingEdited.find('.card-body').text(newText);
  $('#card-edit').modal('toggle')



})


$('.list-cards').sortable(
    {
      connectWith: ".list-cards"
    }
  )
