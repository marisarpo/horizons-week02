"use strict";

// YOUR JAVASCRIPT CODE GOES HERE

var cardBeingEdited = null;
var list = 
'<div class="list-container">' + 
  '<div class="list">' + 
    '<div class="list-header">' + 
      '<span class="list-title">\${title}\</span>' + 
    '</div>' + 
    '<div class="list-cards"></div>' + 
    '<div class="list-footer">' + 
      '<button class="add-card">Add a card...</button>' + 
      '<div class="collapse add-card-form-wrapper">' + 
        '<div class="well add-card-form">' + 
          '<input type="text" class="form-control" placeholder="Card title">' + 
          '<button type="button" class="btn btn-default add-card-save">' + 
            'Save' + 
          '</button>' + 
          '<button type="button" class="btn btn-default add-card-cancel">' + 
            '<span class="glyphicon glyphicon-remove"></span>' + 
          '</button>' + 
        '</div>' + 
      '</div>' + 
    '</div>' + 
  '</div>' + 
'</div>'

/*<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">LIST TITLE GOES HERE</span>
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
</div>*/


//stops being hidden when "add a list is clicked"
$(".add-list").on("click", function()
{
  $(".add-list-form-wrapper").removeClass("collapse");
});


//removes when x under "add a list" is clicked
$(".add-list-cancel").on("click", function()
{
  $(".add-list-form-wrapper").addClass("collapse");
});



$(".add-list-save").on("click", function()
{
  var title = $(".add-list-form-wrapper input").val();
  $(this).closest(".list-container").before(
`<div class="list-container">
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
</div>`
);
  $(this).closest(".add-list-form-wrapper").addClass("collapse");
});

//expand on add card
$(".add-card").on("click", function()
{
  $(this).siblings(".add-card-form-wrapper").removeClass("collapse");
});


//collapse on add card
$(".add-card-cancel").on("click", function()
{
  $(this).closest(".add-card-form-wrapper").addClass("collapse");
});

//save card
$(".add-card-save").on("click", function()
{
  var cardTitle = $(this).prev().val();
  $(this).closest(".list-footer").siblings(".list-cards").append(
`<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardTitle}</div>
</div>`);

  $(this).closest(".add-card-form-wrapper").addClass("collapse");
});



$(".board").on("click", ".card", function() 
{
  cardBeingEdited = $(this);
  $("#card-edit").modal();
  $("#card-edit-body").val(cardBeingEdited.find(".card-body").text());
});

$(".card-edit-save").on("click", function ()
{
  cardBeingEdited.find(".card-body").text($("#card-edit-body").val());
});




$(".list-cards").sortable({
    revert: false,
    items: '.card',
    connectWith: '.list-cards'

});
