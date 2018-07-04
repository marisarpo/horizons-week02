"use strict";

/*

When the .add-list button is clicked, make the .add-list-form-wrapper div visible by removing the collapse CSS class from it.
collapse is a CSS class provided by Bootstrap for easily setting display: none on an element.
*/

$(".add-list").on("click", function(event) {
  $(".add-list-form-wrapper").removeClass("collapse");
});

$(".add-list-save").on("click", function(event) {
  $(".add-list-form-wrapper").removeClass("collapse");
});

$(".add-list-save").on("click", function(event) {
  var t = $("#lolxdlolxda").val();
   $(this).closest('.list-container').before(`


    <div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${t}</span>
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

  $(".add-list-form-wrapper").addClass("collapse");


});
