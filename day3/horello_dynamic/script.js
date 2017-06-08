"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click',  function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click',  function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click',  function() {
  // $('.add-list-form-wrapper').addClass('collapse');
  var title = $('.add-list-form-wrapper input').val();
  var listelem = $(`<div class="list-container">
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
  $('.list-container').eq(-1).before(listelem);
  // $('.list-container').append(listelem);
})

// $('.list-container').on('click','.add-card',function(){
//
// })

$('.board').on('click', '.add-card', function () {
    //HERE
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-card-cancel', function () {
    //HERE
    $('.add-card-form-wrapper',).hide();
});

$('.board').on('click', '.add-card-save', function () {
    //HERE
    var cardTitle = $(this).siblings('input').val();
    var newCard = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardTitle}</div>
</div>`)
  $(this).closest('.list').find('.list-cards').append(newCard);
  // alert('a')
  // console.log($(this));
  // console.log($(this).closest('.add-card-form-wrapper'));
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});


$('.board').on('click', '.card', function () {
  var cardBeingEdited = $(this);
  var cardBody = cardBeingEdited.find('.card-body')
  var existingtext = cardBody.text()

  $('#card-edit-body').val(existingtext);

  $('.card-edit-save').on('click', function() {
    cardBody.text($('#card-edit-body').val())
    $('#card-edit').modal('toggle')
  })

  $('#card-edit').modal()

});


$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: '.list-cards'
});


// $('.sortable').sortable();
