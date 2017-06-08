"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$(document).ready(function(){

//enable add new list
$('.add-list').on('click',function(){
   $('.add-list-form-wrapper').removeClass('collapse');
})

$('.add-list-cancel').on('click',function(){
   $('.add-list-form-wrapper').addClass('collapse');
})

$('.add-list-save').on('click',function(){
	var ListName = $(this).siblings('input').val();
	var html = 
	`
	<div class="list-container">
	  <div class="list">
	    <div class="list-header">
	      <span class="list-title">${ListName}</span>
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
	`
    $('.add-list-form-wrapper').parent().parent().before(html);
})

//enable add new card
$('.board').on('click', 'button.add-card', function() {
   $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
   //this: the add-card button
})

$('.board').on('click', 'button.add-card-cancel', function() {
   $(this).parent().parent().addClass('collapse');  
})

$('.board').on('click', 'button.add-card-save', function() {
   var cardTitle = $(this).siblings('input').val();
   var card = 
   `<div class="card">
	  <span class="card-more">
	    <span class="glyphicon glyphicon-align-left"></span>
	  </span>
	  <div class="card-body">${cardTitle}</div>
	</div>`
    var position = $(this).parents('.list-footer').siblings('.list-cards');
    position.append(card);
    $(this).parent().parent().addClass('collapse'); 
})

//editing card titles
var cardBeingEdited = null;
$('.board').on('click','.card',function(){
   cardBeingEdited = $(this);
   console.log(this);
   console.log($(this));
   $('#card-edit').modal();
   var content = $(this).children('.card-body').text();
   $('#card-edit-body').val(content);
})

$('button.card-edit-save').on('click',function(){
   var content = $('#card-edit-body').val();
   cardBeingEdited.find('.card-body').text(content);
   $('#card-edit').modal('hide');
})

//either way to make the list sortable

// $('.list-cards').sortable({
// 	connectWith: ".list-cards"
// }).disableSelection(); 
//disableSelection is automatically used when using sortable in jQuery
$('.list-cards').sortable({
	connectWith: ".list-cards"
});

//key 'c' to delete card
$(document).keypress(function(event){
  if(event.charCode === 99){
  	$('.card:hover').remove();
  }
})

//random colors
$('.header-logo').on('click',function(){
	var colors =['red','white','green','orange'];
	$('body').css('background-color', colors[Math.floor(Math.random()*colors.length)])
})

})
