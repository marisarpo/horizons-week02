"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
// $('.add-list').click(function() {
$('.add-list').click(function() {
  $(".add-list-form-wrapper").removeClass('collapse');
});

$(".well add-card-form").on('click', '.add-list-cancel', function() {
  $(".well add-card-form").addClass('collapse');
});

$(".well add-card-form").on('click', '.add-list-save', function() {
  var html= '<div class="list-container">'+
  '<div class="list">' +
  '<div class="list-header">' +
  '<span class="list-title">LIST TITLE GOES HERE</span>' +
  '</div>'+
  '<div class="list-cards"></div>' +
  '<div class="list-footer">' +
  '<button class="add-card">Add a card...</button>' +
  '<div class="collapse add-card-form-wrapper">' +
  '<div class="well add-card-form">' +
  '<input type="text" class="form-control" placeholder="Card title">'+
  '<button type="button" class="btn btn-default add-card-save">'+
  Save +
  '</button>'+
  '<button type="button" class="btn btn-default add-card-cancel">' +
  '<span class="glyphicon glyphicon-remove"></span>' +
  '</button>'
  '</div>'
  '</div>'
  '</div>'
  '</div>'
  '</div>';
  $(".well add-card-form").val();
  $(".well add-card-form").before(html);
});

//ADD THE FUCKING CARD-- PART 2
$(".add-card").click(function() {// this is here baby <button class="list-button add-card">Add a card...</button>
  //$(".add-card-form-wrapper").removeClass('collapse');
  var $this = $(this); // will this refer to
  var collapseclass= $(this).siblings('add-card-form-wrapper')
  ('.add-card-form-wrapper').removeClass('collapse')
});
