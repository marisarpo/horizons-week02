"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

$('.add-list').click(function() {
  $('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').click(function() {
  $(this).siblings('input').val('');
  $('.add-list-form-wrapper').addClass('collapse');
});

$('.board').on('click', '.add-card', function() {
  console.log('Add card');
});
