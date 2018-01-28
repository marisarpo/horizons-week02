//registration
// function FacebookUser(fname, lname, email, password) {
//   this.first = fname;
//   this.last = lname;
// //   this.email = email;
// //   this.password = password
// // }

var fname;
var lname;
var email;
var password;


$("#registered").on("click", function(event) {
  event.preventDefault();
  $('.registration').addClass('hide');
  $('.loginFb').removeClass('hide');
})

//registration
$("#register").on("click", function(event) {
  event.preventDefault();
  fname = $('#fname').val();
  lname = $('#lname').val();
  email = $('#email').val();
  password = $('#password').val();


  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/register", {
    method: "POST",
    data: {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    },
    success: function(data) {
      $('.registration').addClass('hide');
      $('.loginFb').removeClass('hide');
    }
  })
});

//login to FB
$("#login").on("click", function(event) {
  event.preventDefault();
  var email = $('#emailLogin').val();
  var password = $('#passwordLogin').val();

  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/users/login", {
    method: "POST",
    data: {
      email: email,
      password: password
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token);
      console.log(localStorage);
      $('.loginFb').addClass('hide');
      $('.newsfeed').removeClass('hide');
      renderFeed();
    }
  })
})

function renderFeed() {
  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts/:page", {
      method: "GET",
      data: {
        token: localStorage.getItem('token')
      },
      success: function(data) {
        var arr = data.response;
        console.log(arr);
        makePosts(arr);
      }
  })
}

function makePosts(arr) {
  arr.forEach(function(item) {
    var postHead = `<div class="card posts" id="${item._id}">
                      <div class="poster">
                        <h6>${item.poster.name}</h6>
                      </div>
                      <div class="card-block reply">
                        <p class="card-text date small">date</p>
                        <p class="card-text">${item.content}</p>
                      </div>

                    </div>`;

    var repliesANDlikes = `<div class="likesANDreplies">${item.comments.length} Replies, ${item.likes.length} Likes</div>`;

    $('.feed').append(postHead);
    $(`#${item._id}`).append(repliesANDlikes);

    var replies = item.comments;
    replies.forEach(function(reply) {
      var replyPost = `<div class="card-block">
                          <div class="reply">
                            <h6 class="replier">${reply.poster.name}</h6>
                            <p class="card-text date small">date</p>
                            <p class="card-text">${reply.content}</p>
                          </div>
                      </div>`
      $(`#${item._id}`).append(replyPost);
    });

    $(`#${item._id}`).append(`<form>
                              <a href="#" class="like btn btn-primary">Like</a>
                              <a href="#" class="btn btn-primary comment">Comment</a>
                              <input type="text" class="form-control entry" placeholder="Post something?">
                              </form>`);
  })
}

//post
$('#makePost').on("click", function(event) {
  var post = $('#fbPost').val();
  console.log(post);

  $.ajax("https://horizons-facebook.herokuapp.com/api/1.0/posts",{
    method: "POST",
    data: {
      content:post,
      token:localStorage.getItem('token')
    },
    success: function(data) {
      $('#fbPost').empty();
      $('.feed').empty();
      renderFeed();
    }
  })
})


//comment
$('.container-fluid').on("click", "a", function(event) {
  event.preventDefault();
  //console.log(event);
  console.log(this);
  //console.log($('a.comment').parent())
  var commentID = $(this).parent().parent().attr('id');
  var contents = $(this).siblings('.entry').val();

  $.ajax(`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/${commentID}`,{
    method: "POST",
    data: {
      content: contents,
      token:localStorage.getItem('token')
    },
    success: function(data) {
      $('.feed').empty();
      renderFeed();
    }
  })
})
