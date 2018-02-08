$(".registerBtn").on('click',function(event){
  event.preventDefault()
  var fName = $(".firstName").val()
  var lName = $(".lastName").val()
  var eMail = $(".emailField").val()
  var passWord = $(".passwordField").val()

  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    data: {
      fname: fName,
      lname: lName,
      email: eMail,
      password: passWord
    },
    success: function(data){
      return true;
    },
    error: function(error){
      alert("Try again")
    }
  })
})

$("#loginPage").hide()

$(".loginBtn").on("click",function(event){
  $("#registrationPage").hide()
  $("#loginPage").show()
  return false
})

$('#regReturn').on("click",function(event){
  $("#registrationPage").show()
  $("#loginPage").hide()
  return false
})

$(".loginMainBtn").on("click",function(event){
  event.preventDefault()
  var eMail = $(".loginEmail").val()
  var passWord = $(".loginPassword").val()

  $.ajax({
    method: "POST",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    data: {
      email: eMail,
      password: passWord
    },
    success: function(data){
      localStorage.setItem("token",data.response.token)
      localStorage.setItem("id", data.response.id)
      $('#loginPage').hide()
      renderFeed(data)
      return true;
    },
    error: function(error){
      alert("Error")
  },
  })
})

// Get comments
function renderFeed(feed){
  var key = localStorage.getItem('token')
  var idd = localStorage.getItem('id')
  $.ajax({
    method: "GET",
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
    data: {
      token: key,
    },
    success: function(response){
      var responseArr = response.response
      console.log(responseArr)
      $.each(responseArr, function fn(i, post){
        // var singlePost = {}
        // singlePost.author = post.poster.name
        // singlePost.text = post.content
        // singlePost.time = post.createdAt
        // $('#feed-anchor').append(JSON.stringify(singlePost))
        renderPosts(post)
      })
    }.bind(this),
    error: function(error){
      console.log(error)
    }
  })
}

//posts
// function posting(){
//   $.ajax({
//     method: "POST",
//     url: "",
//     data: {
//
//     },
//     success: function(response){
//
//     }
//   })
// }


//Render individual posts
function renderPosts(post){
  var wrapper = $('<div id = "commentBox"></div>')
  var container = $('<div id = "commentContainer" class = "col-xs-4 col-xs-offset-2"><div>')
  var commentHead = $('<div id = "commentName"></div')
  var commentBod = $('<div id = "commentBody"></div')
  var commentFoot = $('<div id = "commentFooter"></div')
  wrapper.append(container)
  container.append(commentHead)
  container.append(commentBod)
  container.append(commentFoot)
  commentHead.append($(`<span class = "commentTitle">${post.poster.name}</span>`))
  commentBod.append($(`<p class = "commentContent">${post.content}</p>`))
  commentFoot.append($(`<p class = "commentFooter">${post.comments.length} replies ${post.likes.length} likes</p>`))
  var replies = $('<div id = '+post._id+'></div>')

  $.each(post.comments, function fn(i, comment){
    replies.append(renderComments(comment))
  })
  wrapper.append(replies)
  $('#feed-anchor').append(wrapper.html())

  // $('#' + comment._id).append(wrapper.html())
}

function renderComments(comment){
  var wrapper = $('<div id = "replyBox"></div>')
  var container = $('<div id = "replyContainer" class = "col-xs-4 col-xs-offset-2"><div>')
  var commentHead = $('<div id = "replyName"></div')
  var commentBod = $('<div id = "replyBody"></div')
  wrapper.append(container)
  container.append(commentHead)
  container.append(commentBod)
  commentHead.append($(`<span class = "replyTitle">${comment.poster.name}</span>`))
  commentBod.append($(`<p class = "replyContent">${comment.content}</p>`))
  return wrapper.html()
}
