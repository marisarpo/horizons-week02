$('#LoginContainer').hide();
$('#RegisterButton').on('click', function(event){

  console.log($('#row1').children('input').val());

event.preventDefault();

  $.ajax({
    method: 'POST',
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    data: {
    fname: $('#row1').children('input').val(),
    lname: $('#row2').children('input').val(),
    email: $('#row3').children('input').val(),
    password: $('#row4').children('input').val()
  },
  success: function(resp){
    console.log('success');

  },
  error: function(err){
    console.log("ERROR IS", err)
  },
  })
})
$('#RegLoginButton').on('click', function(event){
   $('#RegContainer').hide();
  $('#LoginContainer').show();

})

$('#BringToReg').on('click', function(event){
  $('#RegContainer').show();
  $('#LoginContainer').hide();

})
$('#LoginButton1').on('click', function(event){
$.ajax({
  method: 'POST',
  url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
  data: {
    email: $('#LoginRow1').children('input').val(),
    password: $('#LoginRow2').children('input').val(),

  },
  success: function(data){
    console.log(data);
    localStorage.setItem('token', data.response.token)
    localStorage.setItem('ID', data.response.id)
    $('#LoginContainer').hide();

  }})
})
