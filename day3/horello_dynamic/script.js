"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.board').on('click', '.add-list', function(){
  $(this).siblings().removeClass('collapse');
})

$('.board').on('click', '.add-list-cancel', function(){
  $(this).parents().eq(1).addClass('collapse');
  $(this).siblings('.form-control').val('');

})

$('.board').on('click', '.add-list-save', function(){
  var listTitle = $(this).siblings('.form-control').val();
  $('.add-list-container').parent().before(`
    <div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">` + listTitle + `</span>
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
    </div>
  `)
  $(this).parents().eq(1).addClass('collapse');
  $(this).siblings('.form-control').val('');
  $('.list-cards').sortable({
    appendTo: '.list-container',
    connectWith: '.list-cards'
  })
})

$('.board').on('click', '.add-card', function(){
  $(this).siblings().removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).parents().eq(1).addClass('collapse');
  $(this).siblings('.form-control').val('');
})

$('.board').on('click', '.add-card-save', function(){
  var cardTitle = $(this).siblings('.form-control').val();
  $(this).parents().eq(2).siblings('.list-cards').append(`
    <div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">` + cardTitle + `</div>
    </div>
  `)
  $(this).parents().eq(1).addClass('collapse');
  $(this).siblings('.form-control').val('');
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  var oldText = $(cardBeingEdited).children('.card-body').text();
  $('#card-edit-body').val(oldText);
  $('#card-edit').modal();
})

$('.modal').on('click', '.card-edit-save', function(){
  var newText = $('textarea').val();
  $(cardBeingEdited).children('.card-body').text(newText);
  $('#card-edit').modal('hide');
})

$('.list-cards').sortable({
  appendTo: '.list-container',
  connectWith: '.list-cards'
})
