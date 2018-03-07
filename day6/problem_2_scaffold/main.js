const tweetBox = document.getElementById('tweetBox');
const charCounter = document.getElementById('charCounter');

$(window).click((e) => {
  if (e.target === tweetBox) {
    $(tweetBox).attr({rows: "2", placeholder: ""});
    $("#menuBar").removeClass('hideMenu');
  } else {
    $(tweetBox).attr({rows: "1", placeholder: "Enter Tweet..."});
    $("#menuBar").addClass('hideMenu');
  }
});

$(tweetBox).bind('input propertychange', () => {
  $(charCounter).text( tweetBox.value.length ? tweetBox.maxLength - tweetBox.value.length : 140 )
});


// $('.tweetOptions').offsetParent()
//     .mouseover((event) => {
//     //  console.log(event)
//     //  console.log(event.currentTarget.firstElementChild);
//       $(event.currentTarget.firstElementChild).removeClass('hide');
//     })
//     .mouseout((event) => {
//       $(event.currentTarget.firstElementChild).addClass('hide');
//     });

$(".expand").click((e) => {
  console.log(e);
  let hidden = $(e.target.parentElement.parentElement.nextElementSibling);
  if (hidden.hasClass('hideMenu')) {
    hidden.removeClass('hideMenu');
    $(e.currentTarget.firstElementChild).text("Collapse");
  } else {
    hidden.addClass('hideMenu');
    $(e.currentTarget.firstElementChild).text("Expand");
  }
});

$("#feed").click((e) => {
  console.log(e);
  console.log(this);
  console.log($(this).parent())
});

$('#feed .inputBox')
  .mouseover((e) => {
  let hidden = $(e.currentTarget
    .firstElementChild
    .firstElementChild
    .lastElementChild
    .firstElementChild
    .nextElementSibling
    .nextElementSibling
    .lastElementChild
    .firstElementChild);
    hidden.removeClass('hide');
  })
  .mouseout((e) => {
    let hidden = $(e.currentTarget
      .firstElementChild
      .firstElementChild
      .lastElementChild
      .firstElementChild
      .nextElementSibling
      .nextElementSibling
      .lastElementChild
      .firstElementChild);
      hidden.addClass('hide');
    });

$('#submitTweet').click((e) => {
    let post = `<div class="inputBox">
                  <div class="inner">
                    <div class="row">
                      <div class="col-auto image">
                        <img src="https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAysAAAAJDc2YzljNzA0LWFhNDctNDY2MS04MzM2LWViOWFmMDY2ODcxZg.jpg" height="50" width="50">
                      </div>
                      <div class="col postBody">
                        <div class="row" style="color: #7d8580">
                          <div class="col-auto mr-auto">
                            <strong style="color: black">Trevor Manz</strong> <trev class='lightFont'>@trevdaddy</trev>
                          </div>
                          <div class="col-auto">
                            Date
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            Some tweet about the meaning of life or something. It doesn't really matter what this is im just testing.
                          </div>
                        </div>
                        <div class="row" style="margin-top: 5; font-size: 14px">
                          <div class="col-auto expand">
                            <a style="color: #7d8580" href="#">Expand</a>
                          </div>
                          <div class="col-6 offset-1">
                            <ul class="tweetOptions hide">
                              <li><a style="color: #7d8580" href="#">Reply</a></li>
                              <li><a style="color: #7d8580" href="#">Retweet</a></li>
                              <li><a style="color: #7d8580" href="#">Favorite</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="row hideMenu" style="margin-top: 5">
                          <div class="col-auto">
                            <b>91</b> Following
                          </div>
                          <div class="col-auto offset-1">
                            <b>91</b> Following
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`

  $('#feed').append(post);
});
