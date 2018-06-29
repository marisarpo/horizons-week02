$("#loginpage").show()
$("#registerpage").hide()
$("#newsfeed").hide()
var userId;
var token;

$("#gotoLogin").on('click', function(event)
{
  event.preventDefault();
  $("#registerpage").hide();

  $("#loginpage").show();
})
$("#gotoRegister").on('click', function(event)
{
  event.preventDefault();
  $("#registerpage").show();
  $("#loginpage").hide();
})


$("#register").on('click', function(event)
{
  event.preventDefault();
  $.ajax({

    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    method: "POST",
    data :
    {
      fname: $("#first-name").val(),
      lname: $("#last-name").val(),
      email: $("#email-reg").val(),
      password: $("#password-reg").val()
    },
    success: function()
    {
      alert("Successful registration!");
      $("#registerpage").hide();
      $("#loginpage").show();

    },
    error: function()
    {
      alert("Error registration");
    }

  })

})


$("#login").on('click', function(event)
{
  event.preventDefault();
  $.ajax({

    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    method: "POST",
    data :
    {
      email: $("#email-login").val(),
      password: $("#password-login").val()
    },
    success: function(a)
    {
      alert("Successful login");
      $("#registerpage").hide();
      $("#loginpage").hide();
      $("#newsfeed").show();
      userId = a.response.id;
      token = a.response.token;
      renderNewsfeed();
    },
    error: function()
    {
      alert("Error login!");
    }

  })

})

function renderNewsfeed()
{
  var postObjs = {};
  $.ajax({

    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
    method: "GET",
    data :
    {
      token: token
    },
    success: function(a)
    {
      postObjs = a.response;
      postObjs.forEach(function(postObj) {
        var toAppend = `<div class = "post">
          <div class = "author">
            ${postObj.poster.name}
          </div>
          <div class = "time">
            ${postObj.createdAt}
          </div>
          <div class = "post-content">
            ${postObj.content}
          </div>
          <hr class="post-divider">
          <div class= "reply-section">
            <div class= "reply-header">
              <span class = "replyCount">${postObj.comments.length} Replies</span>
              <span class = "likeCount"> ${postObj.likes.length} Likes</span>
            </div>
            <div class="replies">

            </div>
            <div class = "reply-footer">
              <button type="submit" class="btn btn-primary like"> Like </button>
              <button type="submit" class="btn btn-primary reply"> Reply </button>
            </div>
          </div>
        </div>`;

        $(".posts").append(toAppend)
        var replyObjs = postObj.comments;
        replyObjs.forEach(function(replyObj)
        {

          var toAppend = `
          <div class = "reply">
          <span class = "author">${replyObj.poster.name}</span>
          <span class = "time">${replyObj.createdAt}</span>
          <div class = "replyContent">  ${replyObj.content}
          </div>
          </div>
          `;


          $(".replies").append(toAppend)



        })
      })

    },
    error: function()
    {
      alert("Error getting posts");
    }

  })
}
