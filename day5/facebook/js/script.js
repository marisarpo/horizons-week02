

$( document ).ready(

  $("#loginForm").hide(),
  $(".container").hide(),

  //GO TO loginForm
  $(".already").on("click", function(event) {
    event.preventDefault()
    $("#registerform").hide()
    $("#loginForm").show()
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


  ///// Retrieve POST

        $.ajax({
          url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
          data: {
            token: localStorage.getItem('token')
          },
          success: function (data) {

            var entirePost;

            for (var i = 0; i < data.response.length; i++) {
              entirePost = `<div class="col-xs-12">
                              <div class="jumbotron col-xs-offset-4" id = "post">
                              <h3 id = "content"> ${data.response[i].poster.name}</h3>
                              <h4> ${new Date(data.response[i].createdAt)} </h4>
                              <h4> ${data.response[i].content} </h4>

                              <button type="button" class="btn btn-default btn-sm">
                              <span class="glyphicon glyphicon-thumbs-up"></span> Like
                              </button>
                              
                              <button type="button" class="btn btn-default btn-sm">
                              <span class="glyphicon glyphicon-pencil"></span> Reply
                              </button>



                              </div>
                              </div>`


              $("#postcontainer").append(entirePost)
            }

          },
          error: function() {
            console.log('error')
          }
        })

      },
      error: function(data) {
        alert("incorrect username or password")
      }

    })
  }),




)
