"use strict"

window.divs = {};

divs.divClick = function() {
	$('ul').click(function(e) {
		var divIndex = 0;
		var children = e.currentTarget.children;
		for (var i = 0; i < children.length; i++) {
			if (children[i].innerHTML === '<div>' + e.target.innerText + '</div>') {
				divIndex = i;
				break;
			}
		}
		document.getElementsByTagName('span')[0].innerHTML = 'That was div index #' + divIndex;
	})
};
divs.divClick();