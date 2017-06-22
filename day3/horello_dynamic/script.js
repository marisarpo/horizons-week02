"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.list-container').on('click', '.add-list', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.list-container').on('click', '.add-list-cancel', function() {
  $('.add-list-form-wrapper').addClass('collapse')
})


$('.add-list-save').on('click', function() {
  var input = $('.add-list-form-wrapper input').val()
  var addcardthing = `<div class="list-container">
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
$(this).closest('.list-container').before(addcardthing)
$('.list-cards').sortable({
    connectWith: '.list-cards'
});

$('.add-list-form-wrapper').addClass('collapse')
  })

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
  })

$('.board').on('click', '.add-card-cancel', function() {
  // $('.add-card-form-wrapper').addClass('collapse')
  $(this).closest('.add-card-form-wrapper').addClass('collapse')
  })

$('.board').on('click', '.add-card-save', function() {
  var input = $(this).siblings('input').val()
  $(this).parents('.list-footer').siblings('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${input}</div>
</div>`)
$(this).closest('.add-card-form-wrapper').addClass('collapse')
$(this).siblings('.form-control').val("")
})

var cardbeingedited = null
$('.board').on('click', '.card', function() {
  cardbeingedited = $(this);
  $('#card-edit').modal()
  var text = cardbeingedited.find('.card-body').text()
  $('#card-edit-body').val(text)

  })

$('.card-edit-save').on('click', function() {
  var nextTitle = $('#card-edit-body').val();
  cardbeingedited.find('.card-body').text(nextTitle)
  $('#card-edit').modal('hide');
  cardbeingedited = null
})

$('.list-cards').sortable({
    connectWith: '.list-cards'
});
