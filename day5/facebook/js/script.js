
var someName = $('#firstName').val();
var someLast = $('#lastName').val();
var someEmail = $('#userEmail').val();
var somePassword =$('#password').val();

// if(localStorage.getItem('token')){
//   $('.container1').hide();
//   $('.container2').hide();
//
// }

$('.container2').hide();
$('.container3').hide();

$(".login").on('click', function(event){
  $('.container2').show();
  $('.container1').hide();
});

$(".goReg").on('click', function(event){
  $('.container1').show();
  $('.container2').hide();
});

$(".register").on('click', function(event){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/users/register`,
    method: 'POST',
    data: {
      fname: $('#firstName').val(),
      lname: $('#lastName').val(),
      email: $('#userEmail').val(),
      password: $('#password').val()
    },
    success: function(event){
      $('.container1').hide();
      $('.container2').show();

    },
    error: function(event){
      console.log('error', event);
    }
  });
});


$(".loginBut").on('click', function(event){
  console.log('hey');
  var email = $('#loginUserName').val();
  var password = $('#loginPassword').val();
  console.log(email);
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/users/login`,
    method: 'POST',
    data: {
      email: email,
      password: password
    },
    success: function(event){
      $('.container2').hide();
      $('.container3').show();
      localStorage.setItem('token', event.response.token)
      post();
    },
    error: function(event){
      console.log('error', event);
    }
  });
});
function post (){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/`,
    method:'GET',
    data:{
      token: localStorage.getItem('token'),
    },
    success: function(event){
      event.response.forEach(function(item) {
        var like = item.likes.length;
        var comments = item.comments.length;
        var html = `
        <div class="hi">
        <h2 class="posterName">${item.poster.name}</h2>
        <p id ="createdAt">${item.createdAt}</p>
        <p id = 'content'>${item.content}</p>
        <div class="line"></div>
        <p id = 'comments'>${comments}</p>
        <p id = 'liked'>${like}</p>
        <button 'class="Like" type="button">
        <span class="glyphicon glyphicon-thumbs-up"></span>
        </button>
        <button class="Reply" type="button">Reply</button>
        </div>`;
        $('.container3').append(html)
      })

    },
    error: function(event){
      console.log('error', event);
    }
  })
}



$("#lookAtMe").on('click', function(event){
  $.ajax({
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts`,
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#MVP').val()
    },
    success: function(event){
      post();
    },
    error: function(event){
      console.log('error', event);
    }
  });
});
