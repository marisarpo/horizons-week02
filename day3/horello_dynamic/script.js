"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').click(function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})
$('.add-list-cancel').click(function(){
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-list-save', function(){
  var title = $(this).siblings('input').val();


 var listElement = $('<div class="list-container">' +
  '<div class="list">' +
    '<div class="list-header">' +
      '<span class="list-title">' + title + '</span>' +
    '</div>' +
    '<div class="list-cards"></div>' +
    '<div class="list-footer">' +
      '<button class="add-card">Add a card...</button>' +
      '<div class="collapse add-card-form-wrapper">' +
        '<div class="well add-card-form">' +
          '<input type="text" class="form-control" placeholder="Card title">' +
          '<button type="button" class="btn btn-default add-card-save">' +
            'Save' +
          '</button>' +
          '<button type="button" class="btn btn-default add-card-cancel">' +
            '<span class="glyphicon glyphicon-remove"></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
'</div>')
// $(this).siblings('input').val()='List name';

$('.add-list-form-wrapper').closest('.list-container').before(listElement);
$('.add-list-form-wrapper').addClass('collapse');
$('.list-cards').sortable({
    connectWith: '.list-cards'
  });
});

$('.board').on('click','.add-card',function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});
$('.board').on('click','.add-card-cancel',function(){
  $(this).parent().addClass('collapse');
});

$('.board').on('click','.add-card-save',function(){
  var card = $(this).siblings('input').val();
var cardElement = $('<div class="card">' +
  '<span class="card-more">' +
    '<span class="glyphicon glyphicon-align-left"></span>' +
  '</span>' +
  '<div class="card-body">' + card + '</div>' +
'</div>')

$(this).closest('.list').children('.list-cards').append(cardElement);
$(this).closest('.add-card-form-wrapper').addClass('collapse');

})


var cardBeingEdited = null;
$('.board').on('click','.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
})

$('.list-cards').sortable({
    connectWith: '.list-cards'
  });
