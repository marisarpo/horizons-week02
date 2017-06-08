"use strict";
$(document).ready(function(){

var cardBeingEdited = null;
var i = 3;
var sortableInput = "";
var r1, g1, b1;

$('.board').on('click','.card', function(){
  cardBeingEdited = $(this);
  $('#card-edit').modal();
  var str = $(this).find('.card-body').text();
  $('#card-edit-body').val(str);
})

$('.card-edit-save').on('click', function(){
  var newStr = $('#card-edit-body').val();
  // console.log(newStr)
  $(cardBeingEdited).find('.card-body').text(newStr);
  $('#card-edit').modal('toggle')
})

$('.add-list').on('click', function(){
  $(this).parent().children('.add-list-form-wrapper').removeClass('collapse')
})

$('.add-list-cancel').on('click', function(){
  $(this).closest('.add-list-form-wrapper').addClass('collapse')
})

$('.board').on('click', '.add-list-save',function(){
var title = $(this).parent().children('input').val()
var list = (`<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">`+ title +`</span>
    </div>
    <div class="list-cards" id = "list-`+ ++i+`"></div>
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
</div>`)
console.log(list)
$('#outside').before(list);
$(this).closest('.add-list-form-wrapper').addClass('collapse');

for (var n=1; n<i; n++) {
  sortableInput = sortableInput.concat('#list-'+n + ', ');
}
sortableInput = sortableInput.concat('#list-'+i);
console.log(typeof sortableInput);
console.log('"'+sortableInput+'"')

$(sortableInput).sortable({
  connectWith: ".list-cards"
}).disableSelection();
})

$('.board').on('click','.add-card', function(){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse')
})

$('.board').on('click', '.add-card-cancel', function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse')
})

$('.board').on('click','.add-card-save', function(){
$(this).closest('.add-card-form-wrapper').addClass('collapse');
var title = $(this).parent().children('input').val()
var card = (`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">`+title+`</div>
</div>`)
// console.log($(this).closest('.list-footer').siblings('.list-cards'));
$(this).closest('.list-footer').siblings('.list-cards').append(card);
$(this).parent().children('input').val('');
})

$('body').keydown(function(press){
  if(press.key === 'c'){
    $('.card :hover').remove()
  }
})

$('.header-logo').on('click', function(){


})


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function changeColor(){
  var r = String(getRandomInt(0,255))
  var g = String(getRandomInt(0,255))
  var b = String(getRandomInt(0,255))
  $('body').css('background-color' , 'rgb('+ r +','+ g +','+ b +')')
  var r = String(getRandomInt(0,255))
  var g = String(getRandomInt(0,255))
  var b = String(getRandomInt(0,255))
  $('.card').css('background-color' , 'rgb('+ r +','+ g +','+ b +')')
  var r = String(getRandomInt(0,255))
  var g = String(getRandomInt(0,255))
  var b = String(getRandomInt(0,255))
  $('.list').css('background-color' , 'rgb('+ r +','+ g +','+ b +')')
  var r = String(getRandomInt(0,255))
  var g = String(getRandomInt(0,255))
  var b = String(getRandomInt(0,255))
  $('header').css('background-color' , 'rgb('+ r +','+ g +','+ b +')')
}

setInterval(changeColor, 5000);

})
