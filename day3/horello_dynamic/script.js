"use strict";

// -- Global vars --

var cardBeingEdited = null;


// ------------ LIST --------------

// make sortable
function make_sortable(){
  $('.list-cards').sortable({
    connectWith: ".list-cards"
  }, '.card');
}

// remove class when add list is clicked
$('.add-list').on("click", function(event){
  $('.add-list-form-wrapper').removeClass('collapse');
});

// add class back when cancel is clicked
$('.add-list-cancel').on("click", function(event){
  $('.add-list-form-wrapper').addClass('collapse');
});


// user saves list
$('.add-list-save').on("click", function(event){
  var input = $('.add-list-form-wrapper input').val();

  var html = `
  <div class="list-container">
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
</div>`;

    html = $(html);

    var list_container = $(this).closest('.list-container');  // get parent

    list_container.before(html);    // add the list

    $('.add-list-form-wrapper input').val('');    // empty input box

    $('.add-list-form-wrapper').addClass('collapse');

    make_sortable();
});


// ------------ CARDS ------------------

// add card
$('.board').on('click', '.add-card', function(event){
  var card_wrapper = $(this).siblings('.add-card-form-wrapper');

  card_wrapper.removeClass('collapse');
});

// add class back when cancel is clicked
$('.board').on("click", ".add-card-cancel", function(event){
  $('.add-card-form-wrapper').addClass('collapse');
});

// add card save button is clicked
$('.board').on("click", '.add-card-save', function(event){

  // DOM traversal
  var sibling = $(this).siblings('input');
  var input = sibling.val();

  // prepare html
  var html = `
  <div class="card">
    <span class="card-more">
      <span class="glyphicon glyphicon-align-left"></span>
    </span>
    <div class="card-body">${input}</div>
  </div>`;

    // DOM traversal
    var footer = $(this).closest('.list-footer');
    var card_container = footer.siblings('.list-cards');  // get parent

    card_container.append(html);    // add the list

    $('.add-card-form-wrapper input').val('');    // empty input box

    // collapse add card wrapper
    footer.children('.add-card-form-wrapper').addClass('collapse');

    make_sortable();
});


// editing card (clicked on the card)
$('.board').on("click", ".card", function(event){
    cardBeingEdited = $(this);

    // open modal
    $('#card-edit').modal();

    // get body contents, put them in modal
    var contents = $(this).find('.card-body').text();
    $('#card-edit-body').val(contents);

});


// saving the card
$('#card-edit .card-edit-save').on("click", function(event){
  // traverse DOM
  var ancestor = $(this).closest('.modal-footer');
  var body = ancestor.siblings('.modal-body');
  var new_text = body.find('textarea').val();

  cardBeingEdited.find('.card-body').text(new_text);    // use global var to update card text value

  $('#card-edit').modal('toggle')     // toggle modal
});
