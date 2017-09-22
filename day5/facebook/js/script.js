var myToken = localStorage.getItem('token');

// go straight to posts
function venmoOn() {
}

$('.display-one').addClass('hide');
$('.display-two').removeClass('hide');
getPosts();
$('.post-post-container').addClass('collapse');


function createUser(fname, lname, email, password) {
  $.ajax({
    url: postUserURL,
    method: 'POST',
    success: true,
    data: {
      email: email,
      password: password,
      fname: fname,
      lname: lname
    },
    error: false
  })
}

$('#register-button').on('click', function(event) {
  event.preventDefault();
  var fname = $('input').eq(0).val();
  var lname = $('input').eq(1).val();
  var email = $('input').eq(2).val();
  var password = $('input').eq(3).val();

  createUser(fname, lname, email, password);
  $('input').eq(0).val('');
  $('input').eq(1).val('');
  $('input').eq(2).val('');
  $('input').eq(3).val('');

  $('.register-form').addClass('collapse');
  $('.login-form').removeClass('collapse')
})


$('#login-button-1').on('click', function(event) {
  event.preventDefault();
  $('.register-form').addClass('collapse');
  $('.login-form').removeClass('collapse');
  $('legend').text('Welcome Back!');
})

$('#go-to-registration').on('click', function(event) {
  event.preventDefault();
  $('.login-form').addClass('collapse');
  $('.register-form').removeClass('collapse');
  $('legend').text('New User Registration!');
})

function loginUser(email, password){
  $.ajax({
    url: loginUserURL,
    method: 'POST',
    data: {
      email: email,
      password: password
    },
    success: function(resp) {
      localStorage.setItem('token', resp.response.token);
      getPosts();
    }
  });
}

$('#login-button-2').on('click', function(event) {
  event.preventDefault();
  var email = $('#loginEmail').val();
  var password = $('#loginPassword').val();
  loginUser(email, password);
})


function getPosts() {
  $.ajax({
    url: getPostsURL,
    method: 'GET',
    data: {
      token: myToken,
    },
    success: function(resp){
      console.log('Got Posts:', resp);
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }

      var userArr = ["Jeff Tang", "Nikita Bondarenko", "Mason Yu", "Hassan Saab", "Rob Durst", "Abhi Ramesh", "Graham Smith", "Eliana Crawforde", "Peter Muncey", "Helperbot"];
      var chargeOrPayArr = ["charged", "paid"];
      var cryptoArr = ["Ethereum", "Bitcoin", "Litecoin", "Dogecoin", "Peercoin", "Namecoin"];

      resp.response.forEach(function(post, index) {
        var createdAtObj = new Date(post.createdAt);
        var relTime = (relativeTime(createdAtObj));
        var chargeOrPay = chargeOrPayArr[Math.floor( (Math.random() * 2) )];
        var randomUser1 = userArr[getRandomInt(0, userArr.length)];
        var randomUser2 = userArr[getRandomInt(0, userArr.length)];
        var randomCurrency = cryptoArr[getRandomInt(0, cryptoArr.length)];

        $('.newsfeed').append(
          // ${post.poster.name} (Facebook requirement)
          `<div class="post" id="${post._id}" style="border: 0.5px solid lightgray; padding: 15px">
          <p class='post-name'><b>${randomUser2}</b> ${chargeOrPay} <b>${randomUser1}</b> in <b style="color: #76ae28">${randomCurrency}</b><i style="float: right;">${relTime}</i></p>
          <p class='post-content'>${post.content}</p>
          <span class='span-replies-likes'>${post.comments.length} Replies, ${post.likes.length} Likes</span>
          <button class='button-like btn btn-default'><i class="glyphicon glyphicon-hand-up"></i></button>
          <button class='button-reply btn btn-default'>Reply</button>
          </div>`
        );
      })
      $('.display-one').addClass('collapse');
      $('.display-two').removeClass('collapse');
    },
    error: function(err) { console.log(err) }
  })
}

if ( $('.display-one').attr('class') === 'closed' ) {
  setInterval(getPosts, 30000);
}

$('#post-post-button').click(function(event) {
  event.preventDefault();
  if ( $('#input-post').val() !== '' ) {
    postPost($('#input-post').val());
    $('#input-post').val('');
  }
})

function postPost(content) {
  $.ajax({
    url: postPostURL,
    method: 'POST',
    data: {
      token: myToken,
      content: content
    },
    success: function(resp) {
      console.log('Post posted:', resp);
    },
    error: function(err) { console.log(err) }
  });
}


function postComment(comment, postId) {
  console.log(comment, postId);
  $.ajax({
    url: postCommentURL + postId,
    method: 'POST',
    data: {
      token: myToken,
      content: comment
    },
    success: function(resp) {
      console.log('Comment posted', resp);
      $('#card-edit').modal('toggle');
      $('#card-edit-body').val('');
    },
    error: function(err) { console.log(err) }
  });
}

$('body').on('click', '.button-reply', function(event) {
  event.preventDefault();
  var postId = $(this).parents('.post').attr('id');
  $('.modal').attr('postId', postId);
  $('#card-edit').modal();
})

$('.card-edit-save').on('click', function(event) {
  var comment = $('#card-edit-body').val();
  var postId = $('.modal').attr('postId');
  postComment(comment, postId);
})


$('body').on('click', '.button-like', function(event) {
  var postId = $(this).parents('.post').attr('id');
  toggleLike(postId);
  console.log($(this).css('background-color'))
  if ( $(this).css('background-color') === 'rgb(230, 230, 230)' || $(this).css('background-color') === 'rgb(255, 255, 255)' ) {
    $(this).css('background-color', 'lightblue');
  }
  else {
    $(this).css('background-color', '#fff');
  }
})

function toggleLike(postId) {
  $.ajax({
    url: getLikesURL,
    method: 'GET',
    data: { token: myToken },
    success: function(resp) {
      console.log('Like toggled', resp);
    },
    error: function(err) { console.log(err) }
  })
}

$('#logout-button').on('click', function(event) {
  logOut();

  function logOut() {
    $.ajax({
      url: getLogoutURL,
      method: 'GET',
      data: { token: myToken },
      success: function(resp) {
        console.log(resp);
        $('.display-two').addClass('collapse');
        $('.display-one').removeClass('collapse');
      },
      error: function(resp) { console.log(resp) }
    })
  }
})

// Bonus 1
function relativeTime(date) {
  var delta = Math.round((+new Date - date) / 1000);

  var minute = 60,
  hour = minute * 60,
  day = hour * 24,
  week = day * 7;

  var fuzzy;

  if (delta < 30) {
    fuzzy = 'just now';
  } else if (delta < minute) {
    fuzzy = delta + ' seconds ago';
  } else if (delta < 2 * minute) {
    fuzzy = 'a minute ago'
  } else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago';
  } else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1 hour ago'
  } else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago';
  } else if (delta < day * 2) {
    fuzzy = 'yesterday';
  }

  return fuzzy;
}


// Double Bonus
// var socket = io.connect('https://horizons-facebook.herokuapp.com/');
// socket.emit('authentication', {'token': myToken });


// BENMO JS
$('.pay-charge').on('click', 'button', function(event) {
  event.preventDefault();
  $('.input-pay-charge').removeClass('collapse');
  $('.pay-charge input').attr('placeholder', 'To: ');

  if ($(this)[0] === $('.btn-pay-top')[0]) {
    $('.btn-pay-bottom').removeClass('collapse');
    $('.btn-charge-bottom').addClass('collapse');
  } else {
    $('.btn-charge-bottom').removeClass('collapse');
    $('.btn-pay-bottom').addClass('collapse');
  }

  // TODO: how to get "Type a friend's name, email address, or phone number" upon clicking within input??
  // if pay btn selected, hide charge btn and show pay btn
  // else if charge btn selected, hide pay btn and show charge btn
})
