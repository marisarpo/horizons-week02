// YOUR CODE HERE

$.ajax('http://horizons-json-cors.s3-website-us-east-1.amazonaws.com/data.json', {
  success: function(response) {
    console.log('success', response);
    largestCountry = returnLargest(response);
    var largestPop = largestCountry["City / Urban area"]
    $("#out").text(largestPop);
  },
  error: function(error) {
    console.log('error', error);
  }
});

function returnLargest(data) {
	largestCountry = data[0];
	for (var i=0; i<data.length; i++){
		if (largestCountry.Population<data[i].Population){
			largestCountry = data[i];
		}
	}
	return largestCountry;
}
