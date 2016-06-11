var users = []
var BUFFER = 10
// true: add to bottom
// false: add to top
function getUsers(bool,cb) {
  var temp = []
  for (var i=0;i<50;i++) {
    $("#status").html('Started')
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data) {
        var name = data.results[0].name.first
        renderUser(name,bool)
        if (bool) {users.push(name)}
        else {users = [name].concat(users)}
        console.log(users.length);
        $("#count").html('Count: '+users.length)
      }
    });
    cb()
  }
}
function finished() {
  $("#status").html('Finished')
}
function clear() {
  $("#status").html('')
}
var timeoutID;
function delayPrint() {
  timeoutID = window.setTimeout(finished, 2000);
}
function clearTimeout() {
  window.clearTimeout(timeoutID);
}
function renderUser(name,bool) {
  var user = $('<div id="user">'+name+'</div>')
  if (bool) {$('#cards').append(user)}
  else {$('#cards').prepend(user)}
}
function addCards() {
  getUsers(true,delayPrint)
  window.setTimeout(clear, 3000)
  mount()
}
function mount() {
  $(document).off()
  $(document).scroll(function() {
    if (window.scrollY===$(document).height()-window.innerHeight) {
      addCards()
      mount()
    }
  })
}
addCards()
mount()