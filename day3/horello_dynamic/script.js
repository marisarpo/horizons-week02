"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').on('click', function(event){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function(event){
  $('.add-list-form-wrapper').addClass('collapse')
})

$('.add-list-save').on('click', function(event){
  var nice = $('input.add-list-form-wrapper').val()
})
