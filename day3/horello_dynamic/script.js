"use strict";

var cardBeingEdited = null;

// YOUR JAVASCRIPT CODE GOES HERE
//when add list button is clicked
$('.board').on('click','.add-list', function(){
  $('.add-list-form-wrapper').removeClass('collapse');

});

$('.board').on('click','.add-list-cancel', function(){
  $('.add-list-form-wrapper').addClass('collapse');
});

//add list save
$('.board').on('click','.add-list-save', function(){
  var myInput = $(this).siblings("input").val();
  $(this).siblings("input").val(null);

  var newList = '<div class=' + '"list-container">' + '<div class="list">' + '<div class="list-header">' + '<span class = "list-title">' + myInput + '</span>' + '</div>' + '<div class = "list-cards">' + '</div>' + '<div class = "list-footer">' + '<button class= "add-card">' + 'Add a card' + '</button>' + '<div class = "collapse add-card-form-wrapper">' + '<div class = "well add-card-form">' + '<input type="text" class="form-control" placeholder="Card title">'
  + '<button type="button" class="btn btn-default add-card-save">' + 'Save' +
  '</button>' + '<button type="button" class="btn btn-default add-card-cancel">' +
  '<span class="glyphicon glyphicon-remove">' + '</span>' + '</button>' +
  '</div>' + '</div>' + '</div>'+ '</div>' + '</div>';

  $('.add-list-container').parent().before(newList);
  $('.add-list-form-wrapper').addClass('collapse');

  $('.list-cards').sortable({
    connectWith: ".list-cards"
  }).disableSelection();






});

$('.board').on('click','.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
});

$('.board').on('click','.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse')
});

//card save

$('.board').on('click', '.add-card-save', function(){
  var myCardInput = $(this).siblings('input').val();
  $(this).siblings('input').val(null);

  var newCardElement = '<div class="card">' + '<span class="card-more">' + '<span class="glyphicon glyphicon-align-left"></span>' + '</span>' + '<div class = "card-body">' + myCardInput + '</div>' +'</div>';

  $(this).closest('.list-footer').siblings('.list-cards').append(newCardElement);

  $(this).closest('.add-card-form-wrapper').addClass('collapse');


  // $('.list-cards').append(newCardElement);
});

$('.list-cards').sortable({
  connectWith: ".list-cards"
}).disableSelection();


//modal

$('.board').on('click', '.card', function(){
  cardBeingEdited = $(this);
  var moda = $('#card-edit').modal();
  var ourBody = $(this).find(".card-body").text();
  $("#card-edit-body").val(ourBody);
  // $('something').modal("toggle");
  // $(".card-edit-save").on("click", function(e){
  //   ourBody = $("#card-edit-body");
  // });
  // $('#card-edit').modal('toggle');

});

$('.modal-footer').on('click', '.card-edit-save', function(){
  var newText = $("#card-edit-body").val();
  $(cardBeingEdited).find(".card-body").text(newText);
  $('.modal').modal('hide');
});
