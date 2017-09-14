"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click', function() {
  $(this).next().removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
  $(this).closest('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click', function() {
  var list = $(this).parent().children('input').val();
  $(this).parent().children('input').val('');
  $(this).closest('.list-container').before(
    `<div class="list-container">
      <div class="list">
        <div class="list-header">
          <span class="list-title">${list}</span>
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
  );
  $(this).closest('.add-list-form-wrapper').addClass('collapse');
  $('.list-cards').sortable({
    items: '.card',
    connectWith: '.list-cards'
  });
})

$('.board').on('click', '.add-card', function() {
  $(this).next().removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
  var card = $(this).parent().children('input').val();
  $(this).parent().children('input').val('');
  $(this).closest('.list').children('.list-cards').append(
    `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${card}</div>
</div>`
  );
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

var cardBeingEdited = null;

$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
})

$('.modal').on('click', '.card-edit-save', function() {
  cardBeingEdited.children('.card-body').html($('#card-edit-body').val());
  cardBeingEdited = null;
})

$('.list-cards').sortable({
  items: '.card',
  connectWith: '.list-cards'
});

$('body').on('keydown', function(event) {
  var c = String.fromCharCode(event.which);
  if (c === 'C') {
    $('.card:hover').remove();
  }
})

var themes = {
  default: ['rgb(0,121,191)', '#e2e4e6', 'white'],
  white: ['white', 'snow', 'azure'],
  black: ['black', 'darkblue', 'navy'],
  pme: ['red', 'black', 'white'],
  lehigh: ['saddlebrown', 'white', 'gold'],
  goth: ['slategray', 'dimgray', 'gainsboro'],
  halloween: ['darkorange', 'black', 'white'],
  christmas: ['green', 'red', 'white'],
  easter: ['lightblue', 'pink', 'lightgreen'],
  ocean: ['aquamarine', 'olivedrab', 'mintcream'],
  obnoxious: ['deeppink', 'magenta', 'plum']
}
var themeNames = Object.keys(themes);
var i = 0;

$('.header-logo').on('click', function() {
  i++;
  if (i >= themeNames.length) { i = 0; }
  $('body').css('background-color', themes[themeNames[i]][0]);
  $('.list').css('background', themes[themeNames[i]][1]);
  $('.card').css('background', themes[themeNames[i]][2]);
})
