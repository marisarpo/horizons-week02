"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

  $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse');
  });

  $('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse');
  })

  $('.add-list-save').on('click', function(){
    console.log(input.val());
  })
