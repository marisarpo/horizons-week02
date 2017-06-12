$.ajax({
  // token: localStorage.getItem('token'),
  url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/1",
  success: function (resp) {
    console.log("I'm Getting the posts");
    resp.response.reverse().forEach(function (postEle) {
      var tmpDate = new Date(postEle.createdAt);
      tmpDate = tmpDate.toLocaleString();
      $(".main-posts").after(`<div class="fb-post">
        <div class="content">
          <h3> ${postEle.poster.name}</h3>
          <h6> ${tmpDate}</h6>
          <h4> ${postEle.content}</h4>
        </div>
          <div class="post-comment">
            <div class="comment-content ${postEle._id}"> </div>
            <div class="buttons col-md-offset-8 col-md-5 " style="float:none !important">
            <button class="like-botton btn btn-default" id=${postEle._id}><i class="glyphicon glyphicon-thumbs-up"></i></button>
            <button class="reply-button btn btn-default" id=${postEle._id} data-toggle="modal" data-target="#myModal">Reply</button>

            </div>
          </div>
        </div>`);
      console.log("The content is ", postEle._id, "# Of Likes", postEle.likes.length)
      console.log("Numofcomments", postEle.comments.length);
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
    <div> <h5 style="display:inline;">${commentEle.poster.name}: </h5> <h6 style="display:inline;">${tmpDateComment} </h6> </div>
    <h4> ${commentEle.content}</h4>
  </div>`);
        } else {
          $(`.comment-content.${postEle._id}`).append(`<div>
          <div> <h5 style="display:inline;">${commentEle.poster.name}: </h5> <h6 style="display:inline;">${tmpDateComment} </h6> </div>
          <h4> ${commentEle.content}</h4>
          </div>`);
        }
        console.log("test", commentEle);
        console.log("commentID", commentEle.content, "# Of Likes", commentEle.createdAt);
        console.log("<--------------------------------------------->")
        flag = true;
      });
      // print the comment
    });
  },
  data: {
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0.1WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8"
  },
  erorr: function (e) {
    console.log("Error, not getting the posts");
  }
});

function render() {

}

$(".main-box").on("click", ".like-botton", function () {
  var $this = $(this);
  $.ajax({
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0.1WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8"
    },
    method: "GET",
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/${this.id}`,
    success: function (resp) {

    },
    error: function (e) {
      alert("like error");
    }
  })
  console.log(this.id);
});

$(".main-box").on("click", ".post-btn", function () {
  var $this = $(this);
  var postInfo = $this.parent().siblings("input").val();
  console.log($this.parent().siblings("input").val());
  $.ajax({
    data: {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIn0.1WqWddnPY6nuwEaaif0bzQALLDT0y_bZBwUmjGWlKm8",
      content: postInfo
    },
    method: "POST",
    url: `https://horizons-facebook.herokuapp.com/api/1.0/posts/`,
    success: function (resp) {
      $this.parent().siblings("input").val("");
    },
    error: function (e) {
      alert("post error");
    }
  })
});

$("body").on("click", $("#postCommentBox"), function () {
  var $this = $(this);
  console.log(this);
  // ajax post for new post
});



// $('.main-box').on('click', '.reply-button', function (e) {
//   alert("hello");
//   $('#addList').addClass('toggle');
// });
//
// $('.main-box').on('shown.bs.collapse', '#addList', function (e) {
//   $('#addListText').focus();
// });

// $('.board').on('click', '#addListSave', function (e) {
//   var listName = $('#addListText').val();
//   // validate input
//   if (!listName) {
//     alert("Please enter a list name");
//     return;
//   }
//   createList(listName);
//   $('#addListText').val('');
//   $('#addList').collapse('toggle');
// });


///  <button class="reply-button btn btn-default id=${postEle._id}">Reply</button>
