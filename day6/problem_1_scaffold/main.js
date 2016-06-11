$('div').click(function(evt){ 
    var target = $(evt.target);
    var parent = $(evt.target.parentElement);
    var arr_children = parent.children();
    var idx = 0;
    for (var i = 0; i < arr_children.length; i ++) {
        if ( target[0].textContent === $(arr_children[i])[0].textContent ) {
            idx = i;
            break;
        }
    }
    $('span').text("This is index " + idx);
})