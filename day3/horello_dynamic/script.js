"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
var cardBeingEdited=null

$('.add-list').on('click',function(){
  var $this=$(this);
  var x= $this.siblings('.add-list-form-wrapper');
  x.removeClass('collapse');

})

$('.add-list-cancel').on('click',function(){
  var $this=$(this);
  var x=$this.parent().parent();
  x.addClass('collapse');
})

$('.add-list-save').on('click',function(){
  var $this=$(this);
  var title = $this.siblings('input').val();
  //starting to create list
  var x=$this.closest('.list-container');
  var list=$(`<div class="list-container">
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
</div>`)
  x.before(list);
  var y=$this.parent().parent();
  y.addClass('collapse');

})


$('.board').on('click','.add-card',function(){
  var $this=$(this);
  var x=$this.siblings('.add-card-form-wrapper');
  x.removeClass('collapse');
})

$('.board').on('click','.add-card-cancel',function(){
  var $this=$(this);
  var x=$this.closest('.add-card-form-wrapper');
  x.addClass('collapse');
})

$('.board').on('click','.add-card-save',function () {

  var $this=$(this);
  var cardtitle = $this.siblings('input').val();
  var card=$(`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardtitle}</div>
</div>`)
var x=$this.closest('.list-footer').siblings('.list-cards');
x.append(card);
var y=$this.closest('.add-card-form-wrapper');
y.addClass('collapse');


})

$('.board').on('click','.card',function(){
  cardBeingEdited=$(this);
  var x=$('#card-edit');
  x.modal();
  var t=$(this).find('.card-body').text();
  $('#card-edit-body').val(t);


})

$('.card-edit-save').on('click',function(){
  var y=cardBeingEdited.find('.card-body');
  y.html($('#card-edit-body').val());
  cardBeingEdited=null;
  var x=$('#card-edit')
  x.modal('hide');

})

$('.list-cards').sortable({
  revert: false,
  items: '.card',
  connectWith: '.list-cards'
})

$(window).on('keydown',function(event){
  var x= String.fromCharCode(event.which)
  if(x==='C'){
    $('.card:hover').remove();
  }
}
)
