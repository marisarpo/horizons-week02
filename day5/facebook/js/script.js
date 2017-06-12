

function sayHello() {
  console.log("hello")
}

function retrievePage() {
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
    data: {
      token: localStorage.getItem('token')
    },
    success: function (data) {
      // console.log(data.response[0].comments.length)
      // console.log(data.response[0].comments[0].content)
      var entirePost;
      var entireComments;
      for (var i = 0; i < data.response.length; i++) {

        entirePost = `<div class="col-xs-12" id="${data.response[i]._id}">
                        <div class="jumbotron col-xs-offset-4" id = "post">
                        <h4 id = "content"> ${data.response[i].poster.name} says</h4>
                        <p> ${data.response[i].content} </p>
                        <h6> ${new Date(data.response[i].createdAt)} </h6>
                        <button type="button" class="btn btn-default btn-md">
                        ${data.response[i].likes.length} likes
                        </button>
                        <button type="button" class="btn btn-default btn-sm likebutton" id="${data.response[i]._id}">
                        <span class="glyphicon glyphicon-thumbs-up"></span> Like
                        </button>
                        <input type="post" class="form-control" id="replyinput" placeholder="Reply">
                        <button type="button" class="btn btn-default btn-sm replybutton" id="${data.response[i]._id}">
                        <span class="glyphicon glyphicon-pencil"></span> Reply
                        </button>
                        </div>`
        console.log(entirePost)
        $("#postcontainer").append(entirePost)

        if (data.response[i].comments.length > 0){

        var commentBox =  `<div class="col-xs-12" id="${data.response[i]._id}">
          <div class="jumbotron col-xs-offset-1" id = "comments">`
          for (var j = 0; j < data.response[i].comments.length; j++) {
            commentBox += `<h4 id = "content"> ${data.response[i].comments[j].poster.name} says: </h4>
            <p> ${data.response[i].comments[j].content} </p>`

            }
            commentBox += `</div>`
            $("#postcontainer").append(commentBox)
      }

      }
    },
    error: function() {
      console.log('error')
    }
  })
}


function refreshPage() {
  $("#postcontainer").empty()
  retrievePage()
}


  $("#registerForm").hide(),
  $(".container").hide(),

  //GO TO loginForm
  $(".already").on("click", function(event) {
    event.preventDefault()
    $("#registerForm").hide()
    $("#loginForm").show()
  }),

  //GO TO registerform
  $(".makeaccount").on("click", function(event) {
    event.preventDefault()
    $("#loginForm").hide()
    $("#registerForm").show()
  }),

  //REGISTRATION
  $(".submitbutton").on("click", function(event) {
    event.preventDefault()
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
      method: 'POST',
      data: {
        fname: $("#firstname").val(),
        lname: $("#lastname").val(),
        email:  $("#email").val(),
        password: $("#pwd").val()
      },
      success: function (data) {
        $("#registerform").hide()
        $("#loginForm").show()
      },
      error: function(data) {
        alert ("Sorry, this email is taken")
      }
    })
  }),



  //LOGIN
  $(".loginbutton").on("click", function(event) {
    console.log("login")
    event.preventDefault()
    $.ajax({
      url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
      method: 'POST',
      data: {
        email:$("#email2").val(),
        password: $("#pwd2").val()
      },
      success: function (data) {
        localStorage.setItem('token',data.response.token),
        $('#loginForm').hide(),
        $(".container").show(),
        refreshPage()
      },
      error: function(data) {
        alert("incorrect username or password")
      }
    })
  })

        //1 POSTING
        $("#postbutton").on("click", function(event) {
          sayHello()
          $.ajax({
            url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
            method: 'POST',
            data: {
              token: localStorage.getItem('token'),
              content: $("#postContent").val()
            },
            success: function (data) {
              console.log("hi"),
              refreshPage()
            },
            error: function() {
              console.log("nope")
            }
          })
        })

  // 2 LIKING
  $("#postcontainer").on("click", ".likebutton", function(event) {
    $.ajax({
      // "this.atrr${data._id}""
      url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${$(this).attr('id')}`,
      data: {
      token: localStorage.getItem('token'),
      },
      success: function (data) {
          refreshPage()
      },
      error: function() {
        console.log("nope")
      }
    })
  })

//3 REFRESH PAGE
    $("#refreshbutton").on("click", function(event) {
  refreshPage()
      //END OF RETREIVE POSTS AGAIN
    })

//MAKE A REPLY
$("#postcontainer").on("click", ".replybutton", function(event) {
  console.log("hello")
  console.log($(this).siblings("#replyinput").val())
  console.log($(this).attr('id'))

  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${$(this).attr('id')}`,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $(this).siblings("#replyinput").val()
    },
    success: function (data) {
      console.log("hi"),
      refreshPage()
    },
    error: function() {
      console.log("nope")
    }
  })

  })

//SHOW REPLIES
  $("#postcontainer").on("click", ".showreply", function(event) {
    console.log("hello")
    //
    // $.ajax({
    //   // "this.atrr${data._id}""
    //   url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${$(this).attr('id')}`,
    //   data: {
    //   token: localStorage.getItem('token'),
    //   },
    //   success: function (data) {
    //       console.log(data)
    //   },
    //   error: function() {
    //     console.log("nope")
    //   }
    // })

})
