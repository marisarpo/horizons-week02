  $(document).ready(function () {
    $(‘#newsfeed’).hide();
    if (localStorage.getItem(‘token’).trim() !== ‘’) {
      render();
    }
  })

  $(‘#log - in -button’).on(‘click’, function (event) {
    event.preventDefault();
    username = $(‘#log - in -username’).val();
    pass = $(‘#log - in -password’).val();
    $.ajax({
      url: ‘https: horizons - facebook.herokuapp.com / api / 1.0 / users / login’,
      method: ‘POST’,
      success: function (data) {
        localStorage.setItem(‘token’, data.response.token);
        localStorage.setItem(‘id’, data.response.id);
        render();
      },
      error: function (e) {
        alert(“Invalid Username / Password”);
      },
      data: {
        email: username,
        password: pass
      }
    });
  });

  $(‘#register - button’).on(‘click’, function (event) {
    event.preventDefault();
    firstName = $(‘#register - first - name’).val();
    lastName = $(‘#register - last - name’).val();
    username = $(‘#register - username’).val();
    pass = $(‘#register - password’).val();
    if (!firstName || !lastName || !userName || !pass) {
      alert(‘You need to fill out the required information!‘);
    }
    $.ajax({
      url: ‘https: //horizons-facebook.herokuapp.com/api/1.0/users/register',
        method: ‘POST’,
      success: function (data) {
        alert(‘Sweet!Now you can log in !‘);
      },
      error: function (err) {
        console.log(err);
      },
      data: {
        fname: firstName,
        lname: lastName,
        email: username,
        password: pass
      }
    })
  })

  $(‘#header - name’).on(‘click’, function (event) {
    alert(‘Here at Facebook Horizons, you are just a number to us.I hope you enjoy your day!-bot’)
  })

  $(‘#log - out - button’).on(‘click’, function (event) {
    $.ajax({
      url: ‘https: //horizons-facebook.herokuapp.com/api/1.0/users/logout’,
        success: function (data) {
          console.log(‘come back here’);
          localStorage.setItem(‘token’, null);
          $(‘#header - name’).text(‘’);
          // hide everything else
          $(‘#log - out - button’).remove();
          $(‘#login - registration’).show();
        },
      error: function (err) {
        alert(‘You fucked up’, +err);
      },
      data: {
        token: localStorage.getItem(‘token’)
      }
    })
  })

  $.ajax({
    // token: localStorage.getItem(‘token’),
    url: “https: //horizons-facebook.herokuapp.com/api/1.0/posts/1",
      success: function (resp) {
        resp.response.reverse().forEach(function (postEle) {
          var tmpDate = new Date(postEle.createdAt);
          tmpDate = tmpDate.toLocaleString();
          $(“.main - posts”).after(`<div class=“fb-post”>
        <div class=“content”>
          <h3> ${postEle.poster.name}</h3>
          <h6> ${tmpDate}</h6>
          <h4> ${postEle.content}</h4>
        </div>
          <div class=“post-comment”>
            <div class=“comment-content ${postEle._id}“> </div>
            <div class=“buttons col-md-offset-8 col-md-5 ” style=“float:none !important”>
            <button class=“like-botton btn btn-default” id=${postEle._id}><i class=“glyphicon glyphicon-thumbs-up”></i></button>
            <button class=“btn btn-deafult reply-button” type=“button” data-toggle=“collapse” data-target=“#button4" aria-expanded=“false” aria-controls=“collapseExample” id=${postEle._id}> Reply</button>
            </div>
          </div>
        </div>`);
          var flag = false;
          if (postEle.comments.length === 0) {
            $(`.comment-content.${postEle._id}`).append(`<div>
      <h4>${postEle.comments.length} Replies, ${postEle.likes.length} likes </h4>
          </div>`);
          }

          postEle.comments.reverse().forEach(function (commentEle) {
            var tmpDateComment = new Date(commentEle.createdAt);
            tmpDateComment = tmpDateComment.toLocaleString();

            if (!flag) {
              $(`.comment-content.${postEle._id}`).append(`<div>
    <h3>${postEle.comments.length} Replies, ${postEle.likes.length} likes </h3>
    <div> <h5 style=“display:inline;“>${commentEle.poster.name}: </h5> <h6 style=“display:inline;“>${tmpDateComment} </h6> </div>
    <h4> ${commentEle.content}</h4>
  </div>`);
            } else {
              $(`.comment-content.${postEle._id}`).append(`<div>
          <div> <h5 style=“display:inline;“>${commentEle.poster.name}: </h5> <h6 style=“display:inline;“>${tmpDateComment} </h6> </div>
          <h4> ${commentEle.content}</h4>
          </div>`);
            }
            flag = true;
          });
          // print the comment
        });
      },
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0.1WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8"
    },
    erorr: function (e) {
      console.log(“Error, not getting the posts”);
    }
  });

  function render() {
    $(‘#login - registration’).hide();
    $(‘#newsfeed’).show();
    $(‘#header - name’).text(‘Hello User‘ + localStorage.getItem(‘id’));
    $(‘#header - name’).after(‘ < button class = “btn btn -
      default” id = “log - out - button” > Log Out < /button>‘);
    }

    $(“.main - box”).on(“click”, “.like - botton”, function () {
      var $this = $(this);
      $.ajax({
        data: {
          token: “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0 .1 WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8 "
        },
        method: “GET”,
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${this.id}`,
        success: function (resp) {

        },
        error: function (e) {
          alert(“like error”);
        }
      })
    });

    $(“.main - box”).on(“click”, “.post - btn”, function () {
      var $this = $(this);
      var postInfo = $this.parent().siblings(“input”).val();
      $.ajax({
        data: {
          token: “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0 .1 WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8”,
          content: postInfo
        },
        method: “POST”,
        url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/`,
        success: function (resp) {
          $this.parent().siblings(“input”).val(“”);
        },
        error: function (e) {
          alert(“post error”);
        }
      })
    });
