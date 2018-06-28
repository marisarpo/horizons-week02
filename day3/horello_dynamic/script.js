"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
// When the `.add-list` button is clicked, make the `.add-list-form-wrapper` div
//     visible by removing the `collapse` CSS class from it. `collapse` is a CSS
//     class provided by Bootstrap for easily setting `display: none` on an element.
//
//     You can remove CSS classes using `$.removeClass()`:


$('.add-list').on('click', function(event){
  $('.add-list-form-wrapper').removeClass('collapse')
})


$('.add-list-cancel').on('click', function(event){
  $('.add-list-form-wrapper').addClass('collapse')
})



$('.add-list-save').on('click', function(event){
  var title = $('.add-list-form-wrapper input').val();

  var htmlString = '<div class="list-container">';
  htmlString += '<div class="list">';
  htmlString += '<div class="list-header">';
  htmlString += '<span class="list-title">' + title + '</span>';
  htmlString += '</div>';
  htmlString += '<div class="list-cards"></div>';
  htmlString += '<div class="list-footer">';
  htmlString += '<button class="add-card">Add a card...</button>';
  htmlString += '<div class="collapse add-card-form-wrapper">';
  htmlString += '<div class="well add-card-form">';
  htmlString += '<input type="text" class="form-control" placeholder="Card title">';
  htmlString += '<button type="button" class="btn btn-default add-card-save">';
  htmlString += 'Save';
  htmlString += '</button>';
  htmlString += '<button type="button" class="btn btn-default add-card-cancel">';
  htmlString += '<span class="glyphicon glyphicon-remove"></span>';
  htmlString += '</button>';
  htmlString += '</div>';
  htmlString += '</div>';
  htmlString += '</div>';
  htmlString += '</div>';
  htmlString += '</div>';

  var $this = $(this);
  var ogList = $this.closest('.list-container')

  $(ogList).before(htmlString);


  $('.add-list-form-wrapper input').val(' ');
  $('.add-list-form-wrapper').addClass('collapse');
})

$('.board').on('click','.add-card', function(event){
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})


$('.board').on('click', '.add-card-cancel', function() {
  $(this).siblings('input').val('');
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
});

$('.board').on('click','.add-card-save', function(event){

 var cardTitle = $(this).siblings('.add-card-form-wrapper input').val();

 var htmlString = '<div class="card">'
 htmlString = htmlString + '<span class="card-more">'
 htmlString = htmlString + '<span class="glyphicon glyphicon-align-left"></span>'
 htmlString = htmlString + '</span>'
 htmlString = htmlString + '<div class="card-body">' + cardTitle + '</div>'
 htmlString = htmlString + '</div>'

 var $this = $(this)
 var ogListFooter = $this.closest('.list-footer')
 var ogListCard = $(ogListFooter).siblings('.list-cards')
 $(ogListCard).append(htmlString)

 $(this).closest('.add-card-form-wrapper').addClass('collapse')
})

// $('.board').on('click', '.add-card-save', function() {
//   var cardBody = $(this).siblings('input').val();
//   $(this).siblings('input').val('');
//
//   var card = '<div class="card">';
//   card += '<span class="card-more">';
//   card += '<span class="glyphicon glyphicon-align-left"></span>';
//   card += '</span>';
//   card += '<div class="card-body">${cardBody}</div>';
//   card += '</div>'
//
//
//   //
//   // $(this).closest('.list').find('.list-cards').append(card);
//   // $(this).closest('.add-card-form-wrapper').addClass('collapse');
// });
