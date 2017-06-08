"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function() {
  var name = ($(this).siblings('input').val());
  var listElem = `
  <div class="list-container">
    <div class="list">
      <div class="list-header">
        <span class="list-title">${name}</span>
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
  $($('.add-list-form-wrapper').closest('.list-container')).before(listElem);
});

var cardBeingEdited = null;

$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  var boody = $(cardBeingEdited).children('.card-body').text();
  $('#card-edit-body').val(boody);
  $('#card-edit').modal();
});

$('.list-cards').sortable({
    // appendTo: 'list-container',
    connectWith: '.list-cards'
  });

  $(().keydown()).on('click', function () {

  })
