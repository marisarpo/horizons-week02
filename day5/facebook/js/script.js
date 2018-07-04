
//once the introduction animation has finished playing, run this code!
$("#introductionAnimation").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(event) {
    $(this).addClass('w3-animate-top');
    console.log("DONE");
  });
