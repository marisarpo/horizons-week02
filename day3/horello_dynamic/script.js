"use strict";

var cardBeingEdited=null



$('.add-list').click(function() {

  $('.add-list-form-wrapper').removeClass('collapse')
});
// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list-cancel').click(function(){

    $('.add-list-form-wrapper').addClass('collapse')

})


$('.add-list-save').click(function() {

var listname=$(this).closest('.well').find('input').val();

var shit = '<div class="list-container">'+'<div class="list">'+'<div class="list-header">'+
'<span class="list-title">'+listname + '</span>'+
    '</div>'+
    '<div class="list-cards">'+'</div>'+
    '<div class="list-footer">'+
      '<button class="add-card">Add a card...</button>'+
      '<div class="collapse add-card-form-wrapper">'+
        '<div class="well add-card-form">'+
          '<input type="text" class="form-control" placeholder="Card title">'+
          '<button type="button" class="btn btn-default add-card-save">'+ 'Save' +
          '</button>'+
          '<button type="button" class="btn btn-default add-card-cancel">'+
            '<span class="glyphicon glyphicon-remove">'+'</span>'+
          '</button>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
$('.list-container:last-child').before(shit);

})



$('.board').on('click','.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
});

$('.board').on('click','.add-card-cancel',function() {
  $(this).closest('.list-footer').find('.add-card-form-wrapper').addClass('collapse')

})


$('.board').on('click','.add-card-save', function() {

  var cardname=$(this).closest('.list-footer').find('input').val();
  var card='<div class="card">'+'<span class="card-more">' + '<span class="glyphicon glyphicon-align-left"></span>'+'</span>'+'<div class="card-body">'+cardname+'</div>'+'</div>'

  var correct=$(this).closest('.list-footer').siblings('.list-cards')


$(correct).append(card);

$(this).closest('.list-footer').find('.add-card-form-wrapper').addClass('collapse')

})








$('.board').on('click','.card',function() {

cardBeingEdited=$(this);

$('#card-edit').modal()


})
