$(document).ready(function(){
 //$('.loginform').hide();
 $('.post-post').hide();
 var currentToken;
 $('.regform').on('click', '.register', function(ev){
   var firstname = $('.fname').val();
   var lastname = $('.lname').val();
   var email = $('.email').val();
   var password = $('.password').val();
   $.ajax({
     url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
     method: 'POST',
     data: {
       fname: firstname,
       lname: lastname,
       email: email,
       password: password
     },
     success: function(resp){
       $('.regform').hide();
       $('.loginform').show();
     }
   });
 });

 $('.loginform').on('click', '.logbutt', function(ev){
   var userN = $('.usern').val();
   var passLog = $('.passlog').val();
   $.ajax({
     url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
     method: 'POST',
     data: {
       email: userN,
       password: passLog
     },
     success: function(data){
       true;
       localStorage.setItem('token', data.response.token)
       $('.loginform').hide();
       currentToken = localStorage.getItem('token');
       $.ajax({
         url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/:page',
         method: 'GET',
         data:{
           token: currentToken
         },
         success: function(data){
           //posts
           console.log(data);
           for (var i = 0; i < data.response.length; i++){
             var postId = data.response[i]._id;
             var userNam = data.response[i].poster.name;
             var text = data.response[i].content;
             var dateOf = data.response[i].createdAt;
             var replied = data.response[i].comments;
             var liked = data.response[i].likes;
             var numLiked = data.response[i].likes.length;
             var numReplied = data.response[i].comments.length;
             $('body').append(`<form class ='post'>
               <div class='nameOfUser'>`+ userNam +`</div>
               <div class='dateTime'>`+ dateOf +`</div>
               <div class='userpost'>`+ text +`</div>
               <footer class ='responses'>
                 <span class='numReplies'>`+ numReplied +`</span>
                 <span class='replies'>Reply</span>
                 <span class='numLikes'>`+ numLiked +`</span>
                 <span class='likes'>Likes</span>
                 <div class='spaceBetween' id='`+ postId +`'></div>
                 <button class='likeButt glyphicon glyphicon-usd' type='button'></button>
                 <button class='replyButt glyphicon glyphicon-comment' type ='button'></button>
               </footer>
             </form>`)
             //comments
             for (var j = 0; j < numReplied; j++){
               var theNames = data.response[i].comments[j].poster.name;
               var theDate = data.response[i].comments[j].createdAt;
               var actualDate = new Date(theDate).toUTCString();
               var theContent = data.response[i].comments[j].content;
               $('#'+postId).append(`<span class='nameOfRep'>`+ theNames +`: </span>
               <span class='dateOfRep'>`+ actualDate +`</span><div class='contentOfRep'> `+theContent+` </div>`);
             }
           }
         }
       });
     }
   });
   $('.post-post').show();
 });

 $('.post-post').on('click', '.postButt', function(ev){
   ev.stopPropagation();
   ev.preventDefault();
   $.ajax({
     url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
     method: 'POST',
     data: {
       token: currentToken,
       content: $(this).siblings($('cont')).val()
     },
     success: true
   });
 });
});
