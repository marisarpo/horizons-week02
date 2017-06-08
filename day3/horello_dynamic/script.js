"use strict";
var cardBeingEdited = null;
$(document).ready(function(){
  $('.add-list').on('click', function(){
    $('.add-list-form-wrapper').removeClass('collapse');




  })
  $('.add-list-cancel').on('click', function(){
    $('.add-list-form-wrapper').addClass('collapse');
  })
  $('.add-list-save').on('click', function(){
    var title = $('.add-list-form-wrapper input').val();
    var str = '<div class="list-container"><div class="list"><div class="list-header"><span class="list-title">'+ title + '</span></div><div class="list-cards"></div><div class="list-footer"><button class="add-card">Add a card...</button><div class="collapse add-card-form-wrapper"><div class="well add-card-form"><input type="text" class="form-control" placeholder="Card title"><button type="button" class="btn btn-default add-card-save">Save</button><button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove"></span></button></div></div></div></div></div>';
    console.log(str);
    var lng = $('.list-container').length;
    console.log(lng);
    $('.list-container').eq(lng-1).before(str);
    $('.list-cards').sortable({
      connectWith: '.list-cards'
    }).disableSelection();
    $('.add-list-form-wrapper input').val('');
    $('.add-list-form-wrapper').addClass('collapse');
  })



  $('.board').on('click', '.add-card', function(){
    $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
  })
  $('.board').on('click','.add-card-cancel', function(){
    $('.add-card-form-wrapper').addClass('collapse');
  })
  $('.board').on('click','.add-card-save', function(){
    var siblings = $(this).siblings('.form-control');
    console.log(siblings);
    var title1 = siblings.val();
    console.log(title1);
    var str1 = '<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span></span><div class="card-body">' + title1 +'</div></div>';
    var temp = $(this).parents('.list-footer').siblings('.list-cards');
    console.log(temp);
    temp.append(str1);
    $('.add-card-form-wrapper').addClass('collapse');
  })
  $('.board').on('click', '.card', function(){
    cardBeingEdited = $(this);
    cardBeingEdited.parents('.board').siblings('#card-edit').modal();
    cardBeingEdited.parents('.board').siblings('#card-edit').find('#card-edit-body').val($(cardBeingEdited).find('.card-body').text());
    $('.card-edit-save').on('click', function(){
      console.log("AS");
      $(cardBeingEdited).find('.card-body').text(cardBeingEdited.parents('.board').siblings('#card-edit').find('#card-edit-body').val())
      cardBeingEdited.parents('.board').siblings('#card-edit').modal('hide');
    })
  })

  $('.list-cards').sortable({
    connectWith: '.list-cards'
  }).disableSelection();
  // $('.card-edit-save').on('click', function(){
  //   $(this).siblings('.add-card-form-wrapper').addClass('collapse');
  // })
})
// YOUR JAVASCRIPT CODE GOES HERE
//sibling called list-cards of the parent of the parent of the parent
