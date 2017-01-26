"use strict";

// YOUR JAVASCRIPT CODE GOES HERE


var cardBeingEdited = null;

$('.board').on('click', '.add-list', function(){
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.board').on('click', '.add-list-cancel', function(){


  $('.add-list-form-wrapper').addClass('collapse');

});

$('.add-list-save').on('click', function(){

  var $this = $(this);
  var list_title = $this.siblings('input').val();

  var newList = '<div class=' + '"list-container">' +
 '<div class="list">' + '<div class="list-header">' +
 '<span class = "list-title">' + list_title + '</span>' +
 '</div>' + '<div class = "list-cards">' + '</div>' +
 '<div class = "list-footer">' + '<button class= "add-card">'
 + 'Add a card...' + '</button>' +
 '<div class = "collapse add-card-form-wrapper">' +
 '<div class = "well add-card-form">' +
 '<input type="text" class="form-control" placeholder="Card title">' +
 '<button type="button" class="btn btn-default add-card-save">' + 'Save' +
 '</button>' + '<button type="button" class="btn btn-default add-card-cancel">' +
 '<span class="glyphicon glyphicon-remove">' + '</span>' + '</button>' +
 '</div>' + '</div>' + '</div>'+ '</div>' + '</div>';


  $('.add-list-container').parent().before(newList);

  $('.list-cards').sortable({
    // Configuration parameters here
    connectWith: ".list-cards"
  }).disableSelection();

});



$('.board').on('click', '.add-card', function(){

  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');


});

$('.board').on('click', '.add-card-cancel', function(){

  $(this).closest('.add-card-form-wrapper').addClass('collapse');


});

$('.board').on("click", ".add-card-save",function(){

  var $this = $(this);

  var cardName = $this.siblings('input').val();

  var card = '<div class="card">' + '<span class="card-more">' +
    '<span class="glyphicon glyphicon-align-left"></span>' +
    '</span>' + '<div class="card-body">' + cardName + '</div>' + '</div>';

    $this.closest('.list-footer').siblings('.list-cards').append(card);

    $(this).closest('.add-card-form-wrapper').addClass('collapse');

});



$('.board').on('click', '.card', function(){

  cardBeingEdited = $(this);

  var cardEdit = $('#card-edit').modal();

   $('#card-edit-body').val($(this).find('.card-body').text());

});

$('.list-cards').sortable({
  // Configuration parameters here
  connectWith: ".list-cards"
}).disableSelection();


// $('.add-card').on("click", function(){
//
//   console.log('hellooooo');
//
// });
