"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$('.add-list').on('click',function() {
  $(this).siblings('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click',function() {
  $(this).closest('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click',function() {
  var listname = $(this).siblings('.form-control').val();
  var newdiv = $(`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${listname}</span>
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
   $(this).closest('.list-container').before(newdiv);
   $(this).closest('.add-list-form-wrapper').addClass('collapse');
 });

 $('.board').on('click','.add-card',function() {
   $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
 });

 $('.board').on('click','.add-card-cancel',function() {
   $(this).closest('.add-card-form-wrapper').addClass('collapse');
 });

 $('.board').on('click','.add-card-save',function() {
   var cardname = $(this).siblings('.form-control').val();
   var newdiv = $(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardname}</div>
</div>`);
$(this).closest('.list-footer').before(newdiv);
$(this).closest('.add-card-form-wrapper').addClass('collapse');
$(this).siblings('.form-control').val('');
});

var carBeingEdited = null;
 $('.board').on('click','.card',function() {
   var orgina = $(this).children('.card-body').text();
   carBeingEdited = $(this);
   $('#card-edit').modal('show');
   $('#card-edit-body').val(orgina);
 });

 $('.card-edit-save').click(function() {
   var input = $(this).parent().siblings('.modal-body').children('.form-control').val();
   carBeingEdited.children('.card-body').text(input);
   $('#card-edit').modal('hide');});


$('.list-cards').sortable({
  // revert: false,
  // items: '.card',
  connectWith: '.list-cards'
});


  //$('.board').on('hover','.card',function() {
  $('.board').on('keydown','.card',function() {
      console.log('ha');
  })
//});

$(window).keydown(function(event) {
if (String.fromCharCode(event.which)== 'C') {
   $('.card:hover').remove();
}
});

$('.header-logo').click(function(event) {
  var colors = ['#ff0000', '#00ff00', '#0000ff'];
  var random_color = colors[Math.floor(Math.random() * colors.length)];
  $('.board').css("background-color",random_color);
  event.preventDefault();});
