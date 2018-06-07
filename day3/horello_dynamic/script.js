"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;


$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse')
});

$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse')
});

$('.add-list-save').on('click', function() {
  var val = $('.add-list-form-wrapper input').val();
  var parent = $(this).closest('.list-container');
  $(parent).before(`
    <div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title"> ${val} </span>
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

    $('.list-cards').sortable({
      connectWith: '.list-cards'
    });
});

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
});

$('.board').on('click','.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse')
});

$('.board').on('click', '.add-card-save', function() {
  var val = $(this).siblings('.add-card-form-wrapper input').val();
  $($(this).closest('.list-footer').siblings('.list-cards')).append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body"> ${val} </div>
</div>`);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
  $(this).siblings('.add-card-form-wrapper input').val('');
});

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var val = $(this).find('.card-body').text();
  $('#card-edit-body').val(val);
  $('.card-edit-save').on('click', function() {
    cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
    $('#card-edit').modal('toggle');
  })
});

$('.card').on('keydown', function(){
    if(String.fromCharCode(e) === 'c') {
        $('.card:hover').closest('.card').remove();
    }
});
