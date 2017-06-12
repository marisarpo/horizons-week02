$(document).ready(function() {
  $("#new-post-outer-1").hide();
  $(".new-post-input").on("click", function() {
    $("#new-post-outer-2").hide();
    $("#new-post-outer-1").show();
  })

  $("#submit-button").on("click", function() {
    var date = (new Date()) + "";
    date = date.split(" ");
    date = date[2] + " " + date[1];
    content = $(".new-post-input").val();
    $("#col-2").append(
      `<div class="tweet">
        <image src="abhi.png" class="photo"/>
        <div class="all-the-text">
          <div class="post-text">
            <div class="user"><strong>Abhi Ramesh</strong> @horizonsrox </div>
            <div class="date"> ${date} </div>
          </div>
          <p class="content"> ${content} </p>
          <a class="expand"> Expand </a>
        </div>
      </div>`
    );
    $(".new-post-input").val("");
  })

})
