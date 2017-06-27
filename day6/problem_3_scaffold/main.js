$(document).ready(function() {
  var counter = 1;
  var i = setInterval(function() {
    $.ajax({
      url: "https://randomuser.me/api/",
      success: function(resp) {
        if (counter <= 50) {
          $('.tile-container').append(`<li>${resp.results[0].name.first}</li>`);
          counter++;
        } else {
          clearInterval(i);
        }
      }
    })
  }, 20);
  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      alert('bottom');
    }
  };
});
