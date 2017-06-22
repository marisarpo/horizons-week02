"use strict";

var cardBeingEdited=null

$('.add-list').on('click',function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})// YOUR JAVASCRIPT CODE GOES HERE


$('.add-list-cancel').on('click',function() {
  $('.add-list-form-wrapper').addClass('collapse');
})


$('.add-list-save').on('click',function() {
  var listtitle = $('.add-list-form-wrapper.form-control').val();
  var diycard= $('<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">'+listtitle+'</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>')
  $('.add-list-form-wrapper').parent().parent().before(diycard);
})


$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})


$('.board').on('click', '.add-card-cancel', function() {
  $(this).parent().parent().addClass('collapse');
})


$('.board').on('click','.add-card-save', function() {
  var cardtitle = $(this).siblings('.form-control').val();
  var newcard= $('<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">'+cardtitle+'</div></div>');
  $(this).closest('.list-footer').siblings('.list-cards').append(newcard);
})


$('.board').on('click', '.card', function() {
  cardBeingEdited = $(this);
  var text = cardBeingEdited.find('.card-body').text();
  $('#card-edit-body').val(text);
  $('#card-edit').modal();
})

$('.card-edit-save').on('click',function(){
  cardBeingEdited.find('.card-body').text($('#card-edit-body').val());
  $('#card-edit').modal('toggle');
})
$('.list-cards').sortable({
  connectWith: '.list-cards'
})

  var thiscard;
$('.card').mouseover(function(){
  thiscard=$(this)

  $(document).keydown(function(event) {
    if ( event.which === 67 ) {
      thiscard.remove();
            }
      });
})
