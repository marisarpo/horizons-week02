$('.website-container').hide();

$('.container').on('click', '#reg-btn', function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/register',
  {
    method: 'POST',
    data: {
      fname: $('#name').val(),
      lname: $('#lastName').val(),
      email: $('#username').val(),
      password: $('#password').val(),
    },
    success: function(response) {
      $('#name').parent().hide();
      $('#lastName').parent().hide();
      $('#reg-btn').hide();
      $('#topedit').text('Login brahhh');
      var button = ` <div class="form-group">
      <label class="col-md-4 control-label"></label>
      <div class="col-md-4 inputGroupContainer1" id="key">
      <a href="#">
      <button id='reg-btn-new' class = 'button-all' type="button" name="button">Go to registration</button>
      </a>
      </div>
      </div>`;
      $('.reg-container').append(button);
    },
  });
})

$('.container').on('click', '#login-bttn', function() {
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    data: {
      email: $('#username').val(),
      password: $('#password').val(),
    },
    success: function(data) {
      localStorage.setItem('token', data.response.token)
      console.log(localStorage.getItem('token'))
      $('.website-container').show();
      $('.container').hide();
      console.log('about to GET posts');
      helperfunction();
    },

  });
})

function helperfunction() {
  console.log('PLEASE WORK')
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/posts/', {
    method: 'GET',
    data: {
      token: localStorage.getItem('token'),
    },
    success: function(evt) {
      console.log('pulling posts');
      evt.response.forEach(function(item, index) {
        var topush1 = `<div class="hi">
      <h2 class="col-12 class1">${item.poster.name}</h2>
      <p class="class3""></p>
      <div class="line"></div>
      <p class= 'col-12 newone'id ='one'>${item.content}</p>
      <button class="Like" type="button">
      <span class="glyphicon glyphicon-thumbs-up"></span>
      </button>
      <button class="Reply" type="button">Reply</button>
      </div>
      </div>`;
        $('.newsfeed').append(topush1)
        console.log(item)
      })

    },
    error: function(evt) {
      console.log('something went wrong')
    }
  })
}

$('.reg-container').on('click', '#reg-btn-new', function() {
  $('#name').parent().show();
  $('#lastName').parent().show();
  $('#reg-btn').show();
  $('#reg-btn-new').hide();
  $('#name').val('');
  $('#lastName').val('');
  $('#username').val('');
  $('#password').val('');
  $('#topedit').text('New User Registration');

})
