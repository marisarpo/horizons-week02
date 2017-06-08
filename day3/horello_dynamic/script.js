"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click',function(){
  $(this).parent().children('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(){
  $('.board').find('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-list-save', function(){
   var listName = $(this).parent().children('.form-control').val();
   var addList = $('<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' +listName+'</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>');
   $('.add-list-form-wrapper').parent().parent().before(addList);
   $('.board').find('.add-list-form-wrapper').addClass('collapse');
   $('.list-cards').sortable({
     connectWith: '.list-cards'
   })
})

$('.board').on('click', '.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).parent().parent().addClass('collapse');
})

$('.board').on('click', '.add-card-save', function(){
  var cardName = $(this).parent().children('.form-control').val();
  var addCard = $('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+ cardName +'</div></div>');
  $(this).parent().parent().parent().siblings('.list-cards').append(addCard);
  $(this).parent().parent().addClass('collapse');
  $('.list-cards').sortable("refresh");
})

var cardBeingEdited = null;
$('.board').on('click', '.card', function(){
  cardBeingEdited = this;
  $('#card-edit').modal();
  var bodyCardBeingEdited = $(cardBeingEdited).children('.card-body').text();
  $('#card-edit-body').val(bodyCardBeingEdited);
})

$('#card-edit').on('click','.card-edit-save',function(){
    var newContent = $('#card-edit-body').val();
    $(cardBeingEdited).children('.card-body').text(newContent);
    $('#card-edit').modal('toggle');
})

// $('.board').on('sortupdate','.list-cards',function(){
//   $(this).sortable({
//     connectWith: '.list-cards'
//   })
// })
//
// onDomChange(function(){
//     $('.list-cards').sortable('refresh');
// });

$('.list-cards').sortable({
  connectWith: '.list-cards'
})
