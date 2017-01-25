"use strict";

// YOUR JAVASCRIPT CODE GOES HERE
$("button.add-list").on("click", function(e) {
  $(this).parent().children(".add-list-form-wrapper").removeClass('collapse');
});

$("button.add-list-cancel").on("click", function(e) {

  $(".add-list-form-wrapper").addClass('collapse');
});

$("button.add-list-save").on("click", function(e) {

  var title = $(this).parent().children(".form-control").val();
  var newList = addList(title);
  $(".list-container:nth-last-child(1)").insertBefore(newList);


  // $(this).closest(".board").append(newList);
});

function addList(title) {
  return $('<div class="list-container"> \
    <div class="list">\
      <div class="list-header">\
        <span class="list-title">' + title + '</span>\
      </div>\
      <div class="list-cards"></div>\
      <div class="list-footer">\
        <button class="add-card">Add a card...</button>\
        <div class="collapse add-card-form-wrapper">\
          <div class="well add-card-form">\
            <input type="text" class="form-control" placeholder="Card title">\
            <button type="button" class="btn btn-default add-card-save">\
              Save\
            </button>\
            <button type="button" class="btn btn-default add-card-cancel">\
              <span class="glyphicon glyphicon-remove"></span>\
            </button>\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>');
}



// $(this).closest(".board").append("");
