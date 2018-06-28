"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;


$('.add-list').on('click', function(event){
    $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function(event){
    $('.add-list-form-wrapper').addClass('collapse');
});

$('button.add-list-save').on('click', function(event){
    var title = $('.add-list-form-wrapper input').val();
    var list = `
    <div class="list-container">
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
    </div>`;
    $(this).closest('.list-container')
    .before(`
    <div class="list-container">
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
    $('.add-list-form-wrapper').addClass('collapse');
    $('.add-list-form-wrapper').val('');


});


$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});


$('.board').on('click', '.add-card-cancel', function(event) {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card-save', function(event) {
  var cardTitle = $(this).prev().val();
  var card = `
    <div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">${cardTitle}</div>
    </div>`;
  var listCards = $(this).closest('.list-footer').siblings('.list-cards');
  listCards.append(card);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
  $(this).prev().val('');

});

$('.board').on('click', '.card', function(event){
  cardBeingEdited = $(this);
  $('#card-edit').modal();

  $('#card-edit-body').val(cardBeingEdited.find('div.card-body').text());

});


$('#card-edit .card-edit-save').on('click', function(event){
  cardBeingEdited.find('div.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('toggle');
});

$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: '.list-cards'
}

  );
