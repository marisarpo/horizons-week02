window.momentum = {};

momentum.newQuote = function() {}

momentum.Everything = function(quote) {
	this.quote;
	if (_.isUndefined(quote)) {this.quote = momentum.newQuote()}
	else {this.quote = quote;}
	this.time = momentum.startTime()
}

momentum.Everything.prototype = {
	getQuote: function() {
		return this.quote;
	},
	setQuote: function(quote) {
		this.quote = quote
	},
	replaceQuote: function() {
		this.quote = momentum.newQuote()
	}
}

// momentum.Everything.prototype.render = function() {
// 	var wrapper = $('<div></div>');
// 	var everythingWrapper = $('<div class="container" id="everything">')
// 	var rowWrapper = $('<div class="row">\
// 				<div class='col-md-4 col-md-offset-4'>\
// 				</div></div>')
// 	var timeWrapper = $('<h1 id="time">'++'</h1>')
// 			'		\
// 					<h3 id="salutation">Hello, Cole</h3>\
// 					<div id="quoteblock">\
// 						<p id="quote">Even monkeys fall from trees</p>\
// 						<input class="form-control" type="text" rows="1" id="quoteBody"></input>\
// 					</div>\
// 				</div>\
// 			</div>\
// 		</div>'
// }