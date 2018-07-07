if (localStorage.token !== ' '){
  $("#login").hide();
  $("#newsfeed").show();
  listPosts();
}

$("#loginLogin").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    method: "POST",
    success: function(data) {
      localStorage.setItem("token",data.response.token);
      $("#login").hide();
      $("#newsfeed").show();
      listPosts();
      //console.log(resp)
    },
    data: {
      email: $("#emailLogin").val(),
      password: $("#passwordLogin").val(),
    },
    error: function(err){
      //console.log(err);
      alert('Oops! Something went wrong.');
    }
  });
});

$("#signUpLogin").on("click", function(event) {
  event.preventDefault();
  $("#signUp").show();
  $("#login").hide();
  //console.log('signuplogin')
  });

$("#signUpSignUp").on("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    method: "POST",
    success: function(data) {
      localStorage.setItem("token",data.reponse.token);
      $("#signUp").hide();
      //$("#login").show();
      $("#newsfeed").show();
      listPosts();
      //console.log(resp)
    },
    data: {
      fname: $("#firstNameSignUp").val(),
      lname: $("#lastNameSignUp").val(),
      email: $("#emailSignUp").val(),
      password: $("#passwordSignUp").val(),
    },
    error: function(err){
      //console.log(err);
      alert('Oops! Something went wrong.');
    }
  });
});

$("#loginSignUp").on("click", function(event) {
  event.preventDefault();
  $("#login").show();
  $("#signUp").hide();
  });

function listPosts () {
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
    method: "GET",
    data: {
      token: localStorage.getItem("token")
    },
    success: function(data) {
      for (var i=0; i<data.response.length; i++){
        var resp=data.response[i];
        //console.log(resp.comments);
        var post = `
        <div class="post" id="${resp._id}">
          <div class="author"> ${resp.poster.name} </div>
          <div class="datePosted">${new Date(resp.createdAt).toLocaleString()}</div>
          <div class="orgPost"> ${resp.content} </div>
          <div class="likesReplies"> ${resp.likes.length} Likes ${resp.comments.length} Comments</div>
          <div class="postComments"
          </div>
          <div class="controls">
              <button class="like btn btn-default glyphicon glyphicon-thumbs-up"></button>
              <button class="reply btn btn-default">Comment</button>
              <!-- <div hidden class="form-group comment">
                <div class="input-group">
                  <input type="text" style="border-radius:5px" class="form-control" id="inputCommentPrevPost" placeholder="Comment here...">
                </div>
              </div> --!>
          </div>
        </div>`;
          $(".listPosts").append(post);
          for (var j=0; j<resp.comments.length; j++) {
            var respCom=resp.comments[j];
            var postCom= `<div class="commentAuthor"> ${respCom.poster.name} </div>
            <div class="dateCommented"> ${new Date(respCom.createdAt).toLocaleString()} </div>
            <div class="comment"> ${respCom.content} </div>`;
            $(`#${resp._id} .postComments`).append(postCom);
          }
      }

      }
    })
  }

 $("#postButton").on("click", function(event) {
    event.preventDefault();
    //debugger;
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
      method: "POST",
      data: {
        token: localStorage.getItem("token"),
        content: $("#postContent").val()
      },
      success: function(data) {
        var resp=data.response;
        //console.log(resp);
        var post = `<div class="post" id="${resp._id}">
          <div class="author"> ${resp.poster.name} </div>
          <div class="datePosted">${resp.createdAt} </div>
          <div class="orgPost"> ${resp.content} </div>
          <div class="likesReplies"> ${resp.likes.length} Likes ${resp.comments.length} Comments</div>
          <div class="controls">
              <button class="like btn btn-default glyphicon glyphicon-thumbs-up"></button>
              <button class="reply btn btn-default">Comment</button>
                <!-- <div hidden class="form-group comment">
                  <div class="input-group">
                    <input type="text" style="border-radius:5px" class="form-control" id="inputCommentPrevPost" placeholder="Comment here...">
                  </div>
                </div> --!>
          </div>
        </div>`;
          $(".listPosts").prepend(post);
        }
      })
  })

  $("#newsfeed").on("click", ".like", function(event) {
     event.preventDefault();
     //debugger;
     var postId = $(this).closest(".post").attr("id");
     //console.log(postId);
     var self = this;
     $.ajax({
       url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/" + postId,
       method: "GET",
       data: {
         token: localStorage.getItem("token"),
         //content: $("#postContent").val()
       },
       success: function(data) {
         console.log(data);
         //debugger;
         console.log($(self).closest(".likesReplies"));
         $(self).closest(".post").children(".likesReplies").text(`${data.response.likes.length} Likes ${data.response.comments.length} Commments`);
         }
       })
   })

   $("#newsfeed").on("click", ".reply", function(event) {
      event.preventDefault();
      //var commentSlot = $(this).children(".comment");
      //debugger;
      var comment = prompt("Comment here...")
      var self = this;
      var postId = $(this).closest(".post").attr("id");
      //console.log(postId);
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/" + postId,
        method: "POST",
        data: {
          token: localStorage.getItem("token"),
          content: comment
        },
        success: function(data) {
          console.log(data);
          //commentSlot.show();
          var myComment = data.response.comments.slice(-1)[0]
          var postCom= `
          <div class="commentAuthor"> ${myComment.poster.name} </div>
          <div class="dateCommented"> ${new Date(myComment.createdAt).toLocaleString()} </div>
          <div class="comment"> ${myComment.content} </div>`;
          $(self).closest(".post").children(".postComments").append(postCom);
          $(self).closest(".post").children(".likesReplies").text(`${data.response.likes.length} Likes ${data.response.comments.length} Commments`);
          }
        })
    })

    $("#logout").on("click", function(event) {
      event.preventDefault();
      $.ajax({
        url: "https://horizons-facebook.herokuapp.com/api/1.0/users/logout",
        method: "GET",
        success: function(data) {
          $("#login").show();
          $("#newsfeed").hide();
          //console.log(resp)
        },
        data: {
          token: localStorage.getItem('token')
        },
        error: function(err){
          //console.log(err);
          alert('Oops! Something went wrong.');
        }
      });
    });

setTimeout(listPosts,30000);
  //document.getElementById('insert').innerHTML = $("#firstNameSignUp").val();
