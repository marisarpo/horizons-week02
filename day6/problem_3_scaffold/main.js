$(document).ready(function() {
  var finished = function() {
    $("#status").html("Finished");
  }
  var clear = function() {
    $("#status").html("");
  }
  var count = 0;
  var totalCount = 0;
  var addName = function() {
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data) {
        var name = data.results[0].name.first;
        $("#col-2").append(
          `<div class = "name-box">
            ${name}
          </div>`
        )
        if (count < 50) {
          count++;
          totalCount++;
          $("#count-num").html(totalCount);
          addName();
        } else {
          finished();
          setTimeout(clear, 1000);
        }
        console.log(name);
      }
    });
  }
  addName();

  $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() == $(document).height()) {
       if (count === 50) {
         count = 0;
         $("#status").html("Started");
         addName();
       }
     }
  });
})
