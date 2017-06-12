$(document).ready(function() {
  $("li").on("click", function() {
    var name = $(this).text();
    var children = Array.prototype.slice.call($(this).parent().children());
    var counter = 0;
    children.forEach(function(child) {
      if ($(child).text() === name) {
        console.log(counter);
      }
      counter++;
    })
  })
})
