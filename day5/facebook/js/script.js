//Register AJAX
//console.log($("button").eq(1));
$("#submitbutton").on('click', function (event) {
  event.preventDefault();
  console.log($("#first-name").val());
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    method: "POST",
    data: {
      fname: $("#first-name").val(),
      lname: $("#last-name").val(),
      email: $("#email-sign-up").val(),
      password: $("#pwd-sign-up").val(),
    },
    success: function () {
      // console.log('kobe!')
      return true;
    }
   })
})
//Login AJAX
$("#log-in-button").on('click', function (event) {
  event.preventDefault()
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    method: "POST",
    data: {
      email: $("#email").val(),
      password: $("#pwd").val(),
    },
    success: function (data) {
      localStorage.setItem('token', data.response.token);
      console.log("Kobe!");
      console.log(localStorage.getItem('token'));
      $('#collapse-registration').addClass("collapse");
      $('#collapse-post').removeClass("collapse");
      getAllPosts();
    }
  })
})
$("#post-btn").on('click', function (event) {
  event.preventDefault();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
    method: "POST",
    data: {
      token: localStorage.getItem('token'),
      content: $("#new-post-entry").val(),
    },
    success: function () {
      getAllPosts()}})})
  // $("#reply-button").on('click', function (event) {
  //   event.preventDefault();
  //   $.ajax({
  //     url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/:post_id",
  //     method: "POST",
  //     data: {
  //       token: localStorage.getItem('token'),
  //       content: $("#new-comment-entry").val(),
  //     },
  //     success: function () {
  //       getAllPosts()}})})
var getAllPosts = function () {$.ajax({
  url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/:page",
  method: "GET",
  data: {
    token: localStorage.getItem('token')
  },
  success: function(r){
    console.log(r);
    console.log(r.response[0].poster.name);
    $(".post-container").empty()
    r.response.forEach(function(element) {
      $(".post-container").append(`<div class="post">
          <div class = "header">
            <h4 class = "author">${element.poster.name}</h4>
            <p class = "time">${element.createdAt}</p>
          </div>
          <div class = "post-body">
            <p class = "content">${element.content}</p>
          </div>
          <div class= "footer">
            <button type="button" class= "btn btn-link">${element.likes.length} Likes</button>
            <div class="new-comment">
              <label for="new-comment-entry">Comment:</label>
              <input type="text" class="new-comment-input" id="new-comment-entry">
            </div>
            <button type ="button" class= "btn btn-link" id="reply-button">${element.comments.length} Replies</button>
          </div>
        </div>`)
    })
  }
})
};
