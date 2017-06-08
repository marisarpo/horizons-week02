"use strict";

var cardBeingEdited = null;
// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click',function(){
  $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click',function(){
  $('.add-list-form-wrapper').addClass('collapse');
})


$('.add-list-save').on('click',function(){
  var usertitle = $('.add-list-form-wrapper').find('input').val();
  $('.add-list-form-wrapper').parent().parent().before(`<div class="list-container"> <div class="list">
    <div class="list-header">
      <span class="list-title">${usertitle}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card">Add a card...</button>
      <div class="collapse add-card-form-wrapper">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title">
          <button type="button" class="btn btn-default add-card-save">
            Save
          </button>
          <button type="button" class="btn btn-default add-card-cancel">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`);
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card', function() {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');

})

$('.board').on('click', '.add-card-cancel', function() {
  $(this).parent().parent().addClass('collapse');

})

$('.board').on('click', '.add-card-save', function() {
  var titlename = $(this).siblings('input').val();
  $(this).parent().parent().parent().siblings('.list-cards').append(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${titlename}</div>
</div>`);
$(this).parent().parent().addClass('collapse');

})


$('.board').on('click', '.card', function() {
  cardBeingEdited = this;//$(this);
  var cardtext = $(this).find('.card-body').text();
  $('#card-edit').modal();
  $('#card-edit-body').val(cardtext);
})

$('.card-edit-save').on('click',function(){
  var updatedcontents = $('#card-edit-body').val();
  $(cardBeingEdited).find('.card-body').text(updatedcontents);
  $('#card-edit').modal('hide');
})

// $('.list-card').connectedSortable();
$('.list-cards').sortable({connectWith: '.list-cards'});

$("body").keydown(function(event) {
  console.log(event);
  if('C' === String.fromCharCode(event.keyCode)){
    $('.card:hover').remove();
    // alert( "Handler for .keydown() called." );
  }
});

var stylelist = ['header-style1','header-style2','header-style3','header-style4'];
var i = 0;
// $('header').on('click',function(){
//   $(this).removeClass(stylelist[i%4]);
//   i+=1;
//   var newcolor = stylelist[i%4];
//   // console.log(newcolor);
//   $(this).addClass(newcolor);
// })

$('.dropdown-menu li a').on('click',function(){
  var currentstyle = $('header').attr('class');
  console.log(currentstyle);
  $('header').removeClass(currentstyle);
  $('header').addClass("header-"+$(this).attr('class'));
})
