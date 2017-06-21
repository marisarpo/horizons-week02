"use strict";

//add list button handler
$('.add-list').on('click', function() {
  $('.add-list-form-wrapper').removeClass('collapse');
})

//add list cancel button handler
$('.add-list-cancel').on('click', function() {
  $('.add-list-form-wrapper').addClass('collapse');
})

//add list save button handler
$('.add-list-save').on('click', function() {
  var title = $(this).siblings('input').val()
})