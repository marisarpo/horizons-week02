// console.log('file run')
$('li').click(function() {
	// console.log('click attached')
	var index = 0
	// console.log($('li'))
	var name = this.innerHTML
	for (var i = 0; i < $('li').length; i++) {
		if ($('li')[i].innerHTML===name) {index=i}
	}
	// console.log(index)
	$('span').text('That index was #'+index)
})
