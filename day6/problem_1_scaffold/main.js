$("li").click((e) => {
  $("span").html('You clicked index ' + $(e.currentTarget).index());
});
