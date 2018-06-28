"use strict";

$(".show-replies").hide();

$(".post.btn").on("click", function() {
    createComment($("div.comments"));
});

$(".comments").on("click", ".reply", function() {
    createComment($(this).parent().siblings(".replies"));
});

function createComment(postTo) {
    var author = prompt("Enter an author", "Anonymous");
    var comment = prompt("Enter a comment");
    var messageDiv = $(`<div>${comment}</div>`).addClass("message");
    var authorDiv = $(`<div>"${author}" says:</div>`).addClass("author");
    var commentDiv = $("<div></div>").addClass("comment").append(authorDiv).append(messageDiv);
    var controlsDiv = $(
        `<div class="controls">
         <button class="hide-replies btn btn-default">Hide Replies</button>
         <button class="show-replies btn btn-default">Show Replies</button>
         <button class="reply btn btn-default">Reply</button>
         </div>
    `);
    commentDiv.append(controlsDiv);
    commentDiv.append($("<div class='replies'></div>"));
    postTo.append(commentDiv);
    commentDiv.find(".show-replies").hide();
}

$(".comments").on("click", ".hide-replies", function() {
    $(this).parent().siblings(".replies").hide();
    $(this).hide();
    $(this).siblings(".show-replies").show();
});

$(".comments").on("click", ".show-replies", function() {
    $(this).parent().siblings(".replies").show();
    $(this).hide();
    $(this).siblings(".hide-replies").show();
});
