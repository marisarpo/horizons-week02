"use strict";

// GLOBAL VARIABLE PART 4
var cardBeingCalled = null;


$('.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection();

// PART 4 CLICK LISTENER;; WE ARE NOT DONE HERE YET
$('.board').on('click', '.card', function() {
  cardBeingCalled = $(this);
  var modal = $('#card-edit').modal();
  var ourBody = $(this).find(".card-body").text();
  $("#card-edit-body").val(ourBody);

})

$('.modal-footer').on('click', '.card-edit-save', function() {
  var newText = $("#card-edit-body").val();
  $(cardBeingCalled).find(".card-body").text(newText);
  $('.modal').modal('toggle');
});



// add list button
$('.board').on('click', '.add-list', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
});




$('.board').on('click', '.add-list-cancel', function() {
  $('.add-list-form-wrapper').addClass('collapse');
});



$('.board').on('click', '.add-list-save', function() {
  var myInput = $(this).siblings("input").val();
  $(this).siblings("input").val(null);
  var $this = $(this);

  var newList = '<div class=' + '"list-container">' +
  '<div class="list">' + '<div class="list-header">' +
  '<span class = "list-title">' + myInput + '</span>' +
  '</div>' + '<div class = "list-cards">' + '</div>' +
  '<div class = "list-footer">' + '<button class= "add-card">'
  + 'Add a card' + '</button>' +
  '<div class = "collapse add-card-form-wrapper">' +
  '<div class = "well add-card-form">' +
  '<input type="text" class="form-control" placeholder="Card title">' +
  '<button type="button" class="btn btn-default add-card-save">' + 'Save' +
  '</button>' + '<button type="button" class="btn btn-default add-card-cancel">' +
  '<span class="glyphicon glyphicon-remove">' + '</span>' + '</button>' +
  '</div>' + '</div>' + '</div>'+ '</div>' + '</div>';

  $('.add-list-container').parent().before(newList);
  $('.add-list-form-wrapper').addClass('collapse');

  // PART 5
  $('.list-cards').sortable({
    connectWith: ".list-cards"
  }).disableSelection();

// doesn't work: board, list-container, list,

});


// CARDS

$('.board').on('click', '.add-card', function() {
  var $this = $(this);
  // $('.add-card-form-wrapper').removeClass('collapse');
  $this.siblings('.add-card-form-wrapper').removeClass('collapse');
});

//////////

$('.board').on('click', '.add-card-cancel', function() {
  var $this = $(this);
  $this.closest('.add-card-form-wrapper').addClass('collapse');
});

////////

$('.board').on('click', '.add-card-save', function() {
  var myCardInput = $(this).siblings("input").val();
  $(this).siblings("input").val(null);
  var $this = $(this);

  var newCardElement = '<div class="card">' + '<span class="card-more">'
  + '<span class="glyphicon glyphicon-align-left"></span>' +
  '</span>' + '<div class = "card-body">' + myCardInput + '</div>' +
  '</div>';

  $this.closest('.list-footer').siblings('.list-cards').append(newCardElement);
  $this.closest('.add-card-form-wrapper').addClass('collapse');
});
