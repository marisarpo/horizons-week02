"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

$('.add-list').on('click',function(){
    $(this).next().removeClass('collapse');
});

$('.add-list-cancel').on('click',function(){
    $(this).closest('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click',function(){
    var newListName = $(this).parent().children('input').val();
    $(this).closest('.list-container').before(`
      <div class="list-container">
        <div class="list">
          <div class="list-header">
            <span class="list-title">${newListName}</span>
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
      </div>
    `);
    $('.list-cards').sortable({
      items: '.card',
      connectWith: '.list-cards'
    });
    $(this).parent().parent().addClass('collapse');
    $(this).parent().children('input').val("");
});

$('.board').on('click','.add-card',function(){
  $(this).next().removeClass('collapse');
});

$('.board').on('click','.add-card-cancel',function(){
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click','.add-card-save',function(){
  var newCardName = $(this).parent().children('input').val();
  $(this).closest('.list').children('.list-cards').append(`
    <div class="card">
      <span class="card-more">
        <span class="glyphicon glyphicon-align-left"></span>
      </span>
      <div class="card-body">${newCardName}</div>
    </div>
  `);
  $(this).parent().parent().addClass('collapse');
  $(this).parent().children('input').val("");
});

$('.board').on('click','.card',function(){
  cardBeingEdited=$(this);
  $('#card-edit').modal();
  $('#card-edit-body').val(cardBeingEdited.children('.card-body').text());
});

$('.modal').on('click','.card-edit-save',function(){
  var newCardText = $(this).closest('.modal-content').find('#card-edit-body').val();
  cardBeingEdited.children('.card-body').text(newCardText);
});

$('.list-cards').sortable({
  items: '.card',
  connectWith: '.list-cards'
});


$("body").keydown(function(event){
    var c = String.fromCharCode(event.which);
    if(c==='C'){
      $('.card:hover').remove();
    }
});

var themes = {
  default: ['rgb(0,121,191)', '#e2e4e6', 'white','none','auto auto'],
  kenyon: ['Indigo', 'DarkGray', 'white','url(img/kenyon.png)','auto auto'],
  white: ['white', 'snow', 'azure','url(img/face1.jpeg)','5% auto'],
  mine: ['white', 'snow', 'azure','url(img/face2.png)','auto auto'],
  goth: ['slategray', 'dimgray', 'gainsboro','url(img/goth.png)','100% 100%'],
  halloween: ['darkorange', 'black', 'white','url(img/halloween.png)','auto 100%'],
  christmas: ['green', 'red', 'white','url(img/christmas.png)','auto 100%'],
  easter: ['lightblue', 'pink', 'lightgreen','url(img/easter.png)','100% 100%'],
  ocean: ['aquamarine', 'olivedrab', 'mintcream','url(img/aqua.png)','100% 100%'],
  obnoxious: ['deeppink', 'magenta', 'plum','url(img/pony.png)','100% 100%']
};
var themeNames = Object.keys(themes);
var i = 0;

$('.header-logo').on('click', function() {
  i++;
  if (i >= themeNames.length) { i = 0; }
  $('body').css('background-color', themes[themeNames[i]][0]);
  $('.list').css('background', themes[themeNames[i]][1]);
  $('.card').css('background', themes[themeNames[i]][2]);
  $('body').css('background-image', themes[themeNames[i]][3]);
  $('body').css('background-size', themes[themeNames[i]][4]);
});
