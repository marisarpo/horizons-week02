"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited = null;

$('.add-list').on('click', function() {
	$('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click', function() {
	$('.add-list-form-wrapper').addClass('collapse');
	$('.add-list-form-wrapper .form-control').val();
})

$('.add-list-save').on('click', function() {
	var title = $('.add-list-form-wrapper .form-control').val();

	$('.add-list-form-wrapper .form-control').val("");

	var list = "<div class='list-container'><div class='list'><div class='list-header'><span class='list-title'>" + title + "</span></div>"
    + "<div class='list-cards'></div><div class='list-footer'><button class='add-card'>Add a card...</button>"
    + "<div class='collapse add-card-form-wrapper'><div class='well add-card-form'><input type='text' class='form-control' placeholder='Card title'>"
    + "<button type='button' class='btn btn-default add-card-save'>Save</button><button type='button' class='btn btn-default add-card-cancel'>"
    + "<span class='glyphicon glyphicon-remove'></span></button></div></div></div></div></div>"

   $(this).closest(".list-container").before(list);

  $('.list-cards').sortable(
	  {
	  	connectWith: '.list-cards'
	  }
  );  
  $('.add-list-form-wrapper').addClass('collapse');

})

$('.board').on('click', '.add-card', function() {
	$(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', '.add-card-cancel', function() {
	$(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', '.add-card-save', function() {
	var input = $(this).closest('.add-card-form-wrapper').find('.form-control').val();

	var card = '<div class="card"><span class="card-more"><span class="glyphicon glyphicon-align-left"></span>'
  						+ '</span><div class="card-body">' + input + '</div></div>';

  $(this).closest('.list').find(".list-cards").append(card);

 	$(this).closest('.add-card-form-wrapper').addClass('collapse');
 	$(this).closest('.add-card-form-wrapper').find('.form-control').val("");
})

$('.board').on('click', '.card', function() {
	cardBeingEdited = $(this);

	$('#card-edit').modal();

	$('#card-edit-body').val(cardBeingEdited.children().eq(1).text());
})

$('#card-edit').on('click', '.card-edit-save', function() {
	cardBeingEdited.children().eq(1).text($('#card-edit-body').val());

	$('#card-edit').modal("hide");
})








  // Configuration parameters here
$('.list-cards').sortable(
  {
  	connectWith: '.list-cards'
  }
);  

$('.list-container').sortable(
  {
  	connectWith: '.list-container'
  }
); 

$('.list-FOOTER').disableSelection();



$(document).keydown(function(event) {

	if (String.fromCharCode(event.keyCode) === 'C') {
		$('.card:hover').remove();

	}
})

$('header').on('click', function() {
	$('header').css({background: "#fff"});
})
