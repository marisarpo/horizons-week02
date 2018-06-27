"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;
var colorArray = [
  "red", "orange", "yellow", "green", "blue", "purple", "white", 
  "brown"
];
var curTopbarIndex = 0;
var curBackgroundIndex = 1;
var curListIndex = 2;
var curCardIndex = 3;

function incrementIndexes() {
  curTopbarIndex += 1;
  if (curTopbarIndex >= colorArray.length) {
    curTopbarIndex -= colorArray.length;
  }

  curBackgroundIndex += 1;
  if (curBackgroundIndex >= colorArray.length) {
    curBackgroundIndex -= colorArray.length;
  }

  curListIndex += 1;
  if (curListIndex >= colorArray.length) {
    curListIndex -= colorArray.length;
  }

  curCardIndex += 1;
  if (curCardIndex >= colorArray.length) {
    curCardIndex -= colorArray.length;
  }
  console.log(curCardIndex);
}

$(document).on('keydown', function(event) {
  if (event.key === "c") {
    $('.card:hover').remove();
  }
});

function setTheme() {
  $('header').css('background-color', colorArray[curTopbarIndex]);
  $('body').css('background-color', colorArray[curBackgroundIndex]);
  $('.list').css('background-color', colorArray[curListIndex]);
  $('.card').css('background-color', colorArray[curCardIndex]);
  $('.board').css('background', 'url("https://cdn-images-1.medium.com/max/1600/1*EuHesBptq_s-R37YJdIbaQ.png") no-repeat center');
}

$('select').on('change', function() {
  var value = Number($(this).val());

  if (value === 0) {
    curTopbarIndex = colorArray.length-1;
  } else {
    curTopbarIndex = value;
  }
  curBackgroundIndex = value;
  curListIndex = value+1;
  curCardIndex = value+2;
  incrementIndexes();
  setTheme();
});

$('.header-logo').on('click', function() {
  setTheme();
  incrementIndexes();
});


$('.list-cards').sortable({
      connectWith: ".list-cards"
}).disableSelection();

$('.board').on('click', '.card', function() {
	cardBeingEdited = $(this);

	$('#card-edit').modal();
	$('#card-edit-body').val($(this).find('.card-body').text());
});

$('.card-edit-save').on('click', function() {
	cardBeingEdited.find('.card-body').html($('#card-edit-body').val());

	$('#card-edit').modal('toggle');
});

$('.add-card').on('click', function() {
	$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
});

$('.add-card-cancel').on('click', function() {
	$(this).parent().parent().addClass('collapse');
});

$('.add-card-save').on('click', function() {
	var cardTitle = $(this).parent().children('.form-control').val();

	var card = `<div class="card">
          <span class="card-more">
            <span class="glyphicon glyphicon-align-left"></span>
          </span>
          <div class="card-body">${cardTitle}</div>
        </div>`;
    $(this).parent().parent().parent().siblings('.list-cards').append(card);
    $(this).parent().parent().hide();
});

$('.add-list').on('click', function() {
	$('.add-list-form-wrapper').removeClass('collapse');
});

$('.add-list-cancel').on('click', function() {
	$('.add-list-form-wrapper').addClass('collapse');
});

$('.add-list-save').on('click', function() {
	var title = $(this).parent('.add-card-form').find('.form-control').val();

	var list = `<div class="list-container">
          <div class="list">
            <div class="list-header">
              <span class="list-title">${title}</span>
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
        </div>`;

    $('.board').prepend(list);

    $(this).parent('.add-card-form').find('.form-control').val("");
    $('.add-list-form-wrapper').addClass('collapse');
});