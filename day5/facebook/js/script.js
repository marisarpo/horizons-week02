$(".regPage").hide();
//$(".loginPage").hide();
$(".newsFeed").hide();
$(".submitPost").hide();

$("#signUpLog").on('click', function() {
  $(".loginPage").hide();
  $(".submitPost").hide();
  $(".newsFeed").hide();
  $(".regPage").show();
});

$("#loginReg").on('click', function() {
  $(".regPage").hide();
  $(".submitPost").hide();
  $(".newsFeed").hide();
  $(".loginPage").show();
});

setInterval(function() {
  $(".newsFeed").empty();
  $(".newsFeed").append(`<div id="footer"></div>`);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/1', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(response) {
      response.response.forEach(function(post) {
        renderPost(post);
      });
      $(".replies-container").append(`<span id="likeBar">
      <button class="btn btn-default glyphicon glyphicon-thumbs-up" id="likeButton"></button>
      <button class="btn btn-primary" id="replyButton">Reply</button>
      <div class="collapse reply-form-wrapper" id = "replyForm">
      <div class="well reply-form">
      <input type="text" class="form-control" placeholder="Your reply..." id = "replyFormRespose"/>
      <button type="button" class="btn btn-default save">Reply</button>
      </div></div>
      </span>`);
    }
  });
}, 30000);

$("#reg").on('click', function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register', {
    method: 'POST',
    success: function(data) {
      $(".regPage").hide();
      $(".submitPost").hide();
      $(".newsFeed").hide();
      $(".loginPage").show();
    },
    data: {
      fname: $("#firstName").val(),
      lname:$("#lastName").val(),
      email: $("#emailReg").val(),
      password: $("#passwordReg").val()
    }
  });

});

$("#loginLog").on('click', function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    data: {
      email: $("#emailLog").val(),
      password: $("#passwordLog").val()
    },
    success: function(data) {
      $(".loginPage").hide();
      localStorage.setItem('token', data.response.token);
      $(".newsFeed").show();
      $(".submitPost").show();
      $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
        method: 'GET',
        data: {
          token: localStorage.getItem('token')
        },
        success: function(response) {
          response.response.forEach(function(post) {
            renderPost(post);
          });
          $(".replies-container").append(`<span id="likeBar">
          <button class="btn btn-default glyphicon glyphicon-thumbs-up" id="likeButton"></button>
          <button class="btn btn-primary" id="replyButton">Reply</button>
          <div class="collapse reply-form-wrapper" id = "replyForm">
          <div class="well reply-form">
          <input type="text" class="form-control" placeholder="Your reply..." id = "replyFormRespose"/>
          <button type="button" class="btn btn-default save">Reply</button>
          </div></div>
          </span>`);
        }
      });
    }
  });
});

$("#postButton").on("click", function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts', {
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $("#postPosts").val()
    },
    success: function(response) {
      renderPost(response.response);
      $(".replies-container").append(`<span id="likeBar">
      <button class="btn btn-default glyphicon glyphicon-thumbs-up" id="likeButton"></button>
      <button class="btn btn-primary" id="replyButton">Reply</button>
      <div class="collapse reply-form-wrapper" id= "replyForm">
      <div class="well reply-form">
      <input type="text" class="form-control" placeholder="Your reply..." id = "replyFormRespose"/>
      <button type="button" class="btn btn-default save">Reply</button>
      </div></div>
      </span>`);
      }
  })
});

$(".newsFeed").on('click', "#likeButton", function() {
  var id = $(this).closest(".post").attr("id");
  $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${id}`,{
    data: {
      token: localStorage.getItem('token')
    },
    success: function(response) {
      console.log(response);
    },
    method: "GET",
    error: function (e) {
      alert("like error");
    }
  })
});

$(".newsFeed").on('click', "#replyButton", function() {
  var form = $(this).siblings("#replyForm")
  form.removeClass("collapse");
  var id = $(this).closest(".post").attr("id");
  $(".save").on('click', function() {
    $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${id}`,{
      data: {
        token: localStorage.getItem('token'),
        content: form.find("#replyFormRespose").val()
      },
      success: function(response) {
        console.log(response);
      },
      method: "POST",
      error: function (e) {
        alert("comment error");
      }
    })
  })
});

$("#logout").on('click', function() {
  $(".submitPost").hide();
  $(".newsFeed").hide();
    $(".loginPage").show();
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/logout', {
    method: "GET",
    data: {
      token: localStorage.getItem('token')
    }
  })
});

function renderPost(post) {
  $("#footer").before(`<div class="post" id=${post._id}>
  <div class="status-container">
  <h4 id="ownerName">${post.poster.name}</h4>
  <p id="time">${post.createdAt}</p>
  <p id="status">${post.content}</p>
  </div>
  <div class="replies-container">
  <h4 id="count">${post.comments.length} replies, ${post.likes.length} likes</h4>
  </div>
  </div>`);
  post.comments.forEach(function(comment) {
    $(".replies-container").append(`<div class="reply">
    <div class="replyInfo">
    <p id="replyName">${comment.poster.name}</p>
    <p id="replyDate">${comment.createdAt}</p>
    </div>
    <p id="replyContent">${comment.content}</p>
    </div>`);
  });
}
