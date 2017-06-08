"use strict";

$(document).ready(function(){

$('.add-list').on("click",function(){

  $('.add-list-form-wrapper').removeClass('collapse')
});

$('.add-list-cancel').on("click",function(){

  $('.add-list-form-wrapper').addClass('collapse')
});

$('.add-list-save').on("click",function(){

  var title= $('.add-list-form-wrapper .form-control').val();
  var $this=$(this);
  var currentContainer=$this.closest('.list-container');
  var newList= $(`<div class="list-container">
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
</div>`)

currentContainer.before(newList);

});

$('.board').on('click', '.add-card', function() {

  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');

});

$('.board').on('click', '.add-card-cancel', function() {

  $(this).closest('.add-card-form-wrapper').addClass('collapse');

});

$('.board').on('click','.add-card-save',function(){
  var $this=$(this);


  var cardTitle= $this.siblings('.form-control').val();


  var newCard=$(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardTitle}</div>
</div>`)

var currListFooter=$this.closest('.list-footer');
var currList=currListFooter.siblings('.list-cards')
currList.append(newCard);

});

var cardBeingEdited=null;

$('.board').on('click', '.card', function() {
  cardBeingEdited=$(this);
  $('#card-edit').modal();
  var currName=$(this).find('.card-body').text()
  $('#card-edit-body').val(currName)


});

$('#card-edit').on('click','.card-edit-save', function() {
  var newName=  $("#card-edit-body").val();
  console.log(newName);
  cardBeingEdited.children('.card-body').text(newName);
  $('#card-edit').modal('toggle');
});

$('.list-cards').sortable({
  connectWith: ".list-cards"
  // Configuration parameters here
  });



})
