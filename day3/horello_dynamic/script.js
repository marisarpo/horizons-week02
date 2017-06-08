"use strict";
// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function() {
$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse')
})
$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse')
})
})

$('.add-list-save').on('click', function() {
  var title = $('.add-list-form-wrapper .form-control').val();
  var newCard = $('<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">' + title + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>');
  $('.add-list-form-wrapper').parent().parent().before(newCard);
});
